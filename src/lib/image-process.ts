export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const COVER_ASPECT = 16 / 9;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Could not read the image")));
    image.src = src;
  });
}

export async function cropAndCompressImage(
  source: string,
  crop: CropArea,
  {
    maxWidth = 1600,
    quality = 0.82,
    fileName = "image.webp",
  }: { maxWidth?: number; quality?: number; fileName?: string } = {},
) {
  const image = await loadImage(source);
  const scale = Math.min(1, maxWidth / Math.max(crop.width, 1));
  const width = Math.max(1, Math.round(crop.width * scale));
  const height = Math.max(1, Math.round(crop.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not process the image");
  context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => (value ? resolve(value) : reject(new Error("Could not compress the image"))), "image/webp", quality);
  });

  const stem = fileName.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${stem}.webp`, { type: "image/webp", lastModified: Date.now() });
}

export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result ?? "")));
    reader.addEventListener("error", () => reject(new Error("Could not read the image")));
    reader.readAsDataURL(file);
  });
}
