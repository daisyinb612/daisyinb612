import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { deflateSync } from "node:zlib";

const width = 1600;
const height = 920;
const output = "assets/academic-hero.png";

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function blend(base, overlay, alpha) {
  return [
    mix(base[0], overlay[0], alpha),
    mix(base[1], overlay[1], alpha),
    mix(base[2], overlay[2], alpha),
  ];
}

function circleInfluence(x, y, cx, cy, radius) {
  const distance = Math.hypot(x - cx, y - cy);
  return Math.max(0, 1 - distance / radius);
}

const raw = Buffer.alloc((width * 4 + 1) * height);

for (let y = 0; y < height; y += 1) {
  const rowStart = y * (width * 4 + 1);
  raw[rowStart] = 0;

  for (let x = 0; x < width; x += 1) {
    const nx = x / width;
    const ny = y / height;
    let pixel = [
      mix(16, 28, nx) + mix(4, 18, ny),
      mix(31, 45, nx) + mix(4, 12, ny),
      mix(50, 70, nx) + mix(8, 18, ny),
    ];

    const tealGlow = circleInfluence(nx, ny, 0.16, 0.2, 0.42);
    const wineGlow = circleInfluence(nx, ny, 0.82, 0.78, 0.48);
    const goldGlow = circleInfluence(nx, ny, 0.66, 0.24, 0.36);

    pixel = blend(pixel, [17, 119, 110], tealGlow * 0.34);
    pixel = blend(pixel, [139, 40, 66], wineGlow * 0.24);
    pixel = blend(pixel, [183, 121, 31], goldGlow * 0.22);

    const grid = x % 80 === 0 || y % 80 === 0;
    if (grid) {
      pixel = blend(pixel, [255, 255, 255], 0.08);
    }

    const curveA = height * (0.58 + 0.055 * Math.sin(nx * 9.2));
    const curveB = height * (0.42 + 0.04 * Math.cos(nx * 12.4));
    if (Math.abs(y - curveA) < 2.2 || Math.abs(y - curveB) < 1.8) {
      pixel = blend(pixel, [216, 242, 239], 0.72);
    }

    if (nx > 0.58 && nx < 0.92 && ny > 0.13 && ny < 0.8) {
      pixel = blend(pixel, [242, 246, 248], 0.2);
      const localX = (nx - 0.58) / 0.34;
      const localY = (ny - 0.13) / 0.67;
      const paperLine = Math.abs((localY * 20) % 1) < 0.035;
      if (paperLine && localX > 0.08 && localX < 0.9) {
        pixel = blend(pixel, [255, 255, 255], 0.3);
      }
      const marginLine = Math.abs(localX - 0.16) < 0.004;
      if (marginLine) {
        pixel = blend(pixel, [13, 118, 110], 0.38);
      }
    }

    const nodePositions = [
      [0.2, 0.28],
      [0.31, 0.5],
      [0.46, 0.37],
      [0.6, 0.58],
      [0.75, 0.43],
    ];
    for (const [cx, cy] of nodePositions) {
      const influence = circleInfluence(nx, ny, cx, cy, 0.018);
      if (influence > 0) {
        pixel = blend(pixel, [255, 255, 255], influence * 0.86);
      }
    }

    const idx = rowStart + 1 + x * 4;
    raw[idx] = clamp(pixel[0]);
    raw[idx + 1] = clamp(pixel[1]);
    raw[idx + 2] = clamp(pixel[2]);
    raw[idx + 3] = 255;
  }
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

const header = Buffer.alloc(13);
header.writeUInt32BE(width, 0);
header.writeUInt32BE(height, 4);
header[8] = 8;
header[9] = 6;

mkdirSync(dirname(output), { recursive: true });
writeFileSync(
  output,
  Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]),
);

console.log(`Wrote ${output}`);
