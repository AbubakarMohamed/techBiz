#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'opt');

// Ensure optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Image formats to process
const FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// Responsive widths to generate
const WIDTHS = [640, 828, 1200, 1920];

async function optimizeImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  if (!FORMATS.includes(ext)) {
    return;
  }

  console.log(`Optimizing ${filename}...`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate WebP versions at different sizes
    for (const width of WIDTHS) {
      if (width <= metadata.width) {
        await image
          .resize(width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 80 })
          .toFile(path.join(OPTIMIZED_DIR, `${baseName}-${width}w.webp`));
      }
    }
    
    // Generate AVIF version (original size)
    await image
      .avif({ quality: 70 })
      .toFile(path.join(OPTIMIZED_DIR, `${baseName}.avif`));
      
    // Generate optimized original format (original size)
    if (ext === '.png') {
      await image
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(path.join(OPTIMIZED_DIR, `${baseName}-opt.png`));
    } else if (ext === '.webp') {
      await image
        .webp({ quality: 85 })
        .toFile(path.join(OPTIMIZED_DIR, `${baseName}-opt.webp`));
    } else {
      await image
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(OPTIMIZED_DIR, `${baseName}-opt.jpg`));
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✓ Optimized ${filename}`);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`✗ Error optimizing ${filename}:`, error.message);
    }
  }
}

async function processDirectory(dir, relativePath = '') {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip opt directory to avoid processing optimized images
      if (item === 'opt') continue;
      
      // Create corresponding directory in opt folder
      const optimizedSubDir = path.join(OPTIMIZED_DIR, relativePath, item);
      if (!fs.existsSync(optimizedSubDir)) {
        fs.mkdirSync(optimizedSubDir, { recursive: true });
      }
      
      await processDirectory(fullPath, path.join(relativePath, item));
    } else if (stat.isFile()) {
      await optimizeImage(fullPath, item);
    }
  }
}

async function main() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('🖼️  Starting image optimization...');
    console.log(`Input directory: ${PUBLIC_DIR}`);
    console.log(`Output directory: ${OPTIMIZED_DIR}`);
  }
  
  await processDirectory(PUBLIC_DIR);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Image optimization completed!');
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}