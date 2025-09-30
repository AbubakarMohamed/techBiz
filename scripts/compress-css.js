#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Simple CSS minification script
 * Removes comments, whitespace, and unnecessary characters
 */

const STYLES_DIR = path.join(__dirname, "../src/styles");

function minifyCSS(css) {
  return (
    css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      // Remove spaces around specific characters
      .replace(/\s*{\s*/g, "{")
      .replace(/;\s*/g, ";")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*,\s*/g, ",")
      // Remove trailing semicolons before closing braces
      .replace(/;}/g, "}")
      // Remove leading/trailing whitespace
      .trim()
  );
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const minified = minifyCSS(content);

    // Create minified version
    const dir = path.dirname(filePath);
    const name = path.basename(filePath, ".css");
    const minPath = path.join(dir, `${name}.min.css`);

    fs.writeFileSync(minPath, minified);

    const originalSize = Buffer.byteLength(content, "utf8");
    const minifiedSize = Buffer.byteLength(minified, "utf8");
    const savings = (
      ((originalSize - minifiedSize) / originalSize) *
      100
    ).toFixed(1);

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `✓ ${path.basename(filePath)} → ${path.basename(minPath)} (${savings}% smaller)`,
      );
    }

    return { originalSize, minifiedSize };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`✗ Error processing ${filePath}:`, error.message);
    }
    return null;
  }
}

function main() {
  console.log("🎨 Compressing CSS files...");

  if (!fs.existsSync(STYLES_DIR)) {
    console.error("Styles directory not found:", STYLES_DIR);
    return;
  }

  const files = fs
    .readdirSync(STYLES_DIR)
    .filter((file) => file.endsWith(".css") && !file.endsWith(".min.css"))
    .map((file) => path.join(STYLES_DIR, file));

  if (files.length === 0) {
    console.log("No CSS files found to compress.");
    return;
  }

  let totalOriginal = 0;
  let totalMinified = 0;

  files.forEach((file) => {
    const result = processFile(file);
    if (result) {
      totalOriginal += result.originalSize;
      totalMinified += result.minifiedSize;
    }
  });

  if (totalOriginal > 0) {
    const totalSavings = (
      ((totalOriginal - totalMinified) / totalOriginal) *
      100
    ).toFixed(1);
    console.log(
      `\n📊 Total compression: ${totalOriginal} bytes → ${totalMinified} bytes (${totalSavings}% savings)`,
    );
  }

  console.log("✅ CSS compression completed!");
}

if (require.main === module) {
  main();
}

module.exports = { minifyCSS, processFile };
