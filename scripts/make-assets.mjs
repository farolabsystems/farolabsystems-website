import fs from "fs";
import path from "path";
import zlib from "zlib";

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([name, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function png(width, height, pixel) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = pixel(x, y, width, height);
      const index = row + 1 + x * 4;
      raw[index] = r;
      raw[index + 1] = g;
      raw[index + 2] = b;
      raw[index + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const palettes = [
  [243, 241, 235, 0, 210, 134],
  [237, 233, 226, 0, 156, 99],
  [204, 255, 236, 51, 51, 51],
  [255, 255, 255, 0, 210, 134],
  [243, 241, 235, 3, 191, 123],
  [237, 233, 226, 91, 89, 83],
];

const dir = path.resolve(import.meta.dirname, "../public/assets/covers");
fs.mkdirSync(dir, { recursive: true });

palettes.forEach((colors, index) => {
  const file = png(960, 640, (x, y, w, h) => {
    const t = (x / w + y / h) / 2;
    return [0, 1, 2].map((channel) => Math.round(colors[channel] * (1 - t) + colors[channel + 3] * t));
  });
  fs.writeFileSync(path.join(dir, `cover-${index + 1}.png`), file);
});

const og = png(1200, 630, (x, y, w, h) => {
  const t = x / w;
  const base = [243, 241, 235];
  const accent = [0, 210, 134];
  const band = y > h * 0.72;
  return band ? accent : base.map((channel, i) => Math.round(channel * (1 - t * 0.15) + accent[i] * t * 0.15));
});
fs.mkdirSync(path.resolve(import.meta.dirname, "../public/assets"), { recursive: true });
fs.writeFileSync(path.resolve(import.meta.dirname, "../public/assets/og.png"), og);
console.log("assets written");
