/**
 * One-time: upload public portfolio images to ImgBB and print URL map.
 * Usage: node scripts/upload-images-to-imgbb.mjs
 * Requires VITE_IMGBB_API_KEY in .env.local (or IMGBB_API_KEY env var)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const loadEnv = () => {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    process.env[key] = val;
  }
};

loadEnv();

const API_KEY =
  process.env.IMGBB_API_KEY || process.env.VITE_IMGBB_API_KEY;

if (!API_KEY) {
  console.error("Missing VITE_IMGBB_API_KEY in .env.local");
  process.exit(1);
}

const files = [
  "abdullah.png",
  "abdullah2.png",
  "omar.png",
  "rohman.png",
  "royal.png",
  "profast.png",
];

const uploadFile = async (filePath, name) => {
  const buffer = fs.readFileSync(filePath);
  const base64 = buffer.toString("base64");

  const body = new URLSearchParams();
  body.append("key", API_KEY);
  body.append("image", base64);
  body.append("name", name);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || `Failed: ${name}`);
  }
  return json.data.url;
};

const main = async () => {
  const urls = {};
  for (const file of files) {
    const full = path.join(publicDir, file);
    if (!fs.existsSync(full)) {
      console.warn(`Skip (missing): ${file}`);
      continue;
    }
    console.log(`Uploading ${file}...`);
    urls[file] = await uploadFile(full, file.replace(/\.[^.]+$/, ""));
    console.log(`  → ${urls[file]}`);
  }

  console.log("\n--- URL map (copy to defaultPortfolio / Firestore) ---\n");
  console.log(JSON.stringify(urls, null, 2));

  const portfolioPath = path.join(root, "src", "data", "imgbb-urls.json");
  fs.writeFileSync(portfolioPath, JSON.stringify(urls, null, 2));
  console.log(`\nSaved: ${portfolioPath}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
