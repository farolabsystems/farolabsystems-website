type Part = {
  text?: string;
  inlineData?: { mimeType?: string; data?: string };
  inline_data?: { mime_type?: string; data?: string };
};

type GeminiResponse = {
  error?: { message?: string; status?: string };
  candidates?: { content?: { parts?: Part[] } }[];
};

function apiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  return key;
}

function redact(text: string) {
  const key = process.env.GEMINI_API_KEY?.trim();
  return key ? text.split(key).join("[redacted]") : text;
}

function failure(status: number, message: string, image: boolean) {
  const clean = redact(message).replace(/\s+/g, " ").trim();
  if (image && status === 429 && /free_tier|limit: 0/i.test(clean)) {
    return "Gemini can write the article, but cover images are not included on this key's free quota. Enable billing on the farolabsystems Google project, then try again.";
  }
  if (status === 429) return "Gemini is rate limiting requests. Wait a minute and try again.";
  return clean.slice(0, 500) || `Gemini returned ${status}`;
}

export async function geminiGenerate(model: string, body: unknown, timeoutMs: number, image = false) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": apiKey(),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    const payload = (await response.json().catch(() => ({}))) as GeminiResponse;
    if (!response.ok) throw new Error(failure(response.status, payload.error?.message || "", image));
    return payload;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw new Error("Gemini took too long to respond");
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export function geminiText(payload: GeminiResponse) {
  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  return parts
    .map((part) => part.text || "")
    .join("\n")
    .trim();
}

export function geminiImage(payload: GeminiResponse) {
  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    const inline = part.inlineData || part.inline_data;
    const data = inline && "data" in inline ? inline.data : undefined;
    if (data) return Buffer.from(data, "base64");
  }
  throw new Error("Gemini did not return a cover image.");
}
