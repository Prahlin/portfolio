import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetDirectory = path.resolve("public/images/aboutdev/workflow-stars");
const colors = ["blue", "green", "orange", "purple", "yellow"];
const exteriorThreshold = 200;

for (const color of colors) {
  const sourcePath = path.join(assetDirectory, `star-${color}.png`);
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixelCount = width * height;
  const exterior = new Uint8Array(pixelCount);
  const queue = new Uint32Array(pixelCount);
  let queueStart = 0;
  let queueEnd = 0;

  const alphaAt = (index) => data[index * channels + 3];
  const enqueueExterior = (index) => {
    if (exterior[index] || alphaAt(index) > exteriorThreshold) return;
    exterior[index] = 1;
    queue[queueEnd++] = index;
  };

  for (let x = 0; x < width; x += 1) {
    enqueueExterior(x);
    enqueueExterior((height - 1) * width + x);
  }

  for (let y = 1; y < height - 1; y += 1) {
    enqueueExterior(y * width);
    enqueueExterior(y * width + width - 1);
  }

  while (queueStart < queueEnd) {
    const index = queue[queueStart++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) enqueueExterior(index - 1);
    if (x < width - 1) enqueueExterior(index + 1);
    if (y > 0) enqueueExterior(index - width);
    if (y < height - 1) enqueueExterior(index + width);
  }

  const mask = Buffer.alloc(pixelCount * 4);
  for (let index = 0; index < pixelCount; index += 1) {
    const outputOffset = index * 4;
    const sourceAlpha = alphaAt(index);
    mask[outputOffset + 3] = exterior[index] ? 0 : 255 - sourceAlpha;
  }

  const outputPath = path.join(
    assetDirectory,
    `star-${color}-cutout-mask.png`,
  );
  await sharp(mask, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);
  const stats = await fs.stat(outputPath);
  console.log(`${path.basename(outputPath)} ${stats.size} bytes`);
}
