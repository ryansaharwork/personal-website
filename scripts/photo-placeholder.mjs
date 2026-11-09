// Prints a tiny inline placeholder for the homepage headshot cutout: a ~24px-wide WebP that keeps the
// transparency, as a data URI to paste into site.photo.cutoutPlaceholder (content/site.ts).
// Re-run whenever the cutout changes:  npm run placeholder [-- path/to/cutout.webp]
import sharp from "sharp";

const src = process.argv[2] ?? "public/images/photo-cutout-hd.webp";
const buf = await sharp(src).resize({ width: 24 }).webp({ quality: 60, alphaQuality: 70, effort: 6 }).toBuffer();
const { width, height } = await sharp(buf).metadata();
console.error(`${src} -> ${width}x${height}, ${buf.length} bytes`);
console.log(`data:image/webp;base64,${buf.toString("base64")}`);
