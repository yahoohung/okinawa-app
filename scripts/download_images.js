import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'src', 'assets');
const DATA_DIR = path.join(PROJECT_ROOT, 'src', 'data');

const JSON_FILES = [
  path.join(DATA_DIR, 'itinerary2.json'),
  path.join(DATA_DIR, 'food.json')
];

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    protocol.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Simple redirect handling
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

function getExtension(url) {
  const parts = url.split('.');
  const last = parts[parts.length - 1].split('?')[0].split('#')[0];
  if (['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg'].includes(last.toLowerCase())) {
    return last.toLowerCase();
  }
  return 'jpg'; // fallback
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function processFile(filePath) {
  console.log(`Processing ${path.basename(filePath)}...`);
  let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  async function walk(obj, parentKey = '') {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = await walk(obj[i], parentKey);
      }
    } else if (obj !== null && typeof obj === 'object') {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('http')) {
          const url = obj[key];
          const ext = getExtension(url);
          // Try to generate a useful filename
          const nameBase = obj.id || obj.title || obj.name || path.basename(url, path.extname(url));
          const filename = `${slugify(String(nameBase))}.${ext}`;
          const destPath = path.join(ASSETS_DIR, filename);

          console.log(`  Downloading ${url} -> ${filename}`);
          try {
            await downloadImage(url, destPath);
            obj[key] = filename; // Update JSON to local filename
            changed = true;
          } catch (err) {
            console.error(`  Failed to download ${url}: ${err.message}`);
          }
        } else {
          obj[key] = await walk(obj[key], key);
        }
      }
    }
    return obj;
  }

  content = await walk(content);

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`  Updated ${path.basename(filePath)}`);
  } else {
    console.log(`  No changes for ${path.basename(filePath)}`);
  }
}

async function main() {
  for (const file of JSON_FILES) {
    if (fs.existsSync(file)) {
      await processFile(file);
    }
  }
  console.log('Done!');
}

main().catch(console.error);
