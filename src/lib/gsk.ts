import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

type Envelope = {
  status?: string;
  message?: string;
  data?: unknown;
};

const CLI = path.join(process.cwd(), "node_modules", "@genspark", "cli", "dist", "index.js");

function redact(text: string) {
  const key = process.env.GSK_API_KEY?.trim();
  return key ? text.split(key).join("[redacted]") : text;
}

export function gskFailure(message: string) {
  const service = message.match(/belongs to the '([^']+)'/)?.[1];
  if (message.includes("TOOL_NOT_ENABLED") && service) {
    return `Genspark refused this because the ${service} service is turned off for this API key. Turn that service on in Genspark, then try again.`;
  }
  if (message.includes("TOOL_UNAVAILABLE")) {
    return "This Genspark API key cannot use that tool.";
  }
  return redact(message).slice(0, 600);
}

function parseEnvelope(stdout: string): Envelope {
  const lines = stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    try {
      const value = JSON.parse(lines[index]) as Envelope;
      if (value && typeof value === "object" && "status" in value) return value;
    } catch {
      /* keep looking for the JSON envelope */
    }
  }
  throw new Error(gskFailure(stdout.trim() || "Genspark returned an empty response"));
}

export async function runGsk(args: string[], timeoutMs = 180_000) {
  const apiKey = process.env.GSK_API_KEY?.trim();
  if (!apiKey) throw new Error("GSK_API_KEY is not set");
  const flags = [...args];
  if (!flags.includes("--yes")) flags.push("--yes");
  if (!flags.includes("--no-input")) flags.push("--no-input");
  if (!flags.includes("--output")) flags.push("--output", "json");

  const child = spawn(process.execPath, [CLI, ...flags], {
    env: {
      ...process.env,
      GSK_API_KEY: apiKey,
      GSK_BASE_URL: process.env.GSK_BASE_URL?.trim() || "https://www.genspark.ai",
      GSK_NO_AUTO_UPDATE: "1",
    },
    windowsHide: true,
  });

  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk: string) => {
    stderr += chunk;
  });

  const exitCode = await new Promise<number>((resolve, reject) => {
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error("Genspark took too long to respond"));
    }, timeoutMs);
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve(code ?? 1);
    });
  });

  if (!stdout.trim()) {
    throw new Error(gskFailure(stderr.trim() || `Genspark exited ${exitCode}`));
  }
  const envelope = parseEnvelope(stdout);
  if (envelope.status === "error" || exitCode !== 0) {
    throw new Error(gskFailure(envelope.message || stderr || `Genspark exited ${exitCode}`));
  }
  return envelope;
}

export async function withArgsFile<T>(payload: unknown, run: (file: string) => Promise<T>) {
  const dir = await mkdtemp(path.join(tmpdir(), "farolab-gsk-"));
  const file = path.join(dir, "args.json");
  await writeFile(file, JSON.stringify(payload));
  try {
    return await run(file);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export async function readGeneratedFile(file: string) {
  return readFile(file);
}
