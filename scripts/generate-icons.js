/**
 * generate-icons.js
 * Creates public/icons/icon-192.png and icon-512.png
 * using only Node.js built-ins (zlib + fs).
 * Designed as a postinstall step for Railway.
 */

const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUT_DIR = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── CRC32 ───────────────────────────────────────────────
function buildCRC32Table() {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
}
const CRC_TABLE = buildCRC32Table();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// ── PNG chunk ────────────────────────────────────────────
function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len       = Buffer.alloc(4);  len.writeUInt32BE(data.length);
  const crcInput  = Buffer.concat([typeBytes, data]);
  const crcBuf    = Buffer.alloc(4);  crcBuf.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

// ── Create a solid-color PNG with a centred rounded rect and "F" ──
// (we paint pixels directly, no font rendering — just a stylish block)
function createIconPNG(size) {
  const BLUE  = [0x00, 0x23, 0x95];
  const WHITE = [0xFF, 0xFF, 0xFF];
  const RED   = [0xED, 0x29, 0x39];

  // Allocate pixel buffer (RGBA)
  const pixels = new Uint8Array(size * size * 4);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const i = (y * size + x) * 4;
    pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b; pixels[i+3] = a;
  }

  // Background: blue
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      setPixel(x, y, ...BLUE);

  // Bottom red stripe (bottom 14% of icon)
  const stripeY = Math.floor(size * 0.86);
  for (let y = stripeY; y < size; y++)
    for (let x = 0; x < size; x++)
      setPixel(x, y, ...RED);

  // Draw a simple white "F" using thick rectangles
  // Scale relative to icon size
  const s   = size / 192;       // scale factor (1 for 192, ~2.67 for 512)
  const lx  = Math.round(48 * s);  // left x of F
  const ty  = Math.round(40 * s);  // top y
  const stk = Math.round(26 * s);  // stroke width
  const w1  = Math.round(96 * s);  // full width of F top bar
  const w2  = Math.round(72 * s);  // mid bar width
  const ht  = Math.round(112 * s); // full height of vertical bar
  const mid = ty + Math.round(44 * s); // y of mid bar

  function fillRect(x0, y0, rw, rh, r, g, b) {
    for (let dy = 0; dy < rh; dy++)
      for (let dx = 0; dx < rw; dx++)
        setPixel(x0 + dx, y0 + dy, r, g, b);
  }

  // Vertical stroke
  fillRect(lx, ty, stk, ht, ...WHITE);
  // Top horizontal bar
  fillRect(lx, ty, w1, stk, ...WHITE);
  // Middle horizontal bar
  fillRect(lx, mid, w2, stk, ...WHITE);

  // ── Encode PNG (RGB, no alpha for better compat) ──────
  // Filter byte 0 (None) per row
  const rowLen = size * 3;
  const rawData = Buffer.alloc(size * (1 + rowLen));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + rowLen);
    rawData[rowStart] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const si = (y * size + x) * 4; // source pixel
      const di = rowStart + 1 + x * 3;
      rawData[di]   = pixels[si];
      rawData[di+1] = pixels[si+1];
      rawData[di+2] = pixels[si+2];
    }
  }

  const compressed = zlib.deflateSync(rawData, { level: 6 });

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8]  = 8; // bit depth
  ihdrData[9]  = 2; // color type: RGB
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  return Buffer.concat([
    PNG_SIG,
    pngChunk('IHDR', ihdrData),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Generate ─────────────────────────────────────────────
[192, 512].forEach(size => {
  const dest = path.join(OUT_DIR, `icon-${size}.png`);
  if (fs.existsSync(dest)) {
    console.log(`✓ ${path.basename(dest)} already exists – skipping.`);
    return;
  }
  const buf = createIconPNG(size);
  fs.writeFileSync(dest, buf);
  console.log(`✓ Generated ${path.basename(dest)} (${buf.length} bytes)`);
});

console.log('Icons ready.');
