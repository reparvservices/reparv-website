// Node ESM resolve hook so `node --test` can import the app's modules the way
// Next/webpack does: the "@/" alias (jsconfig.json → ./src) and extensionless
// relative imports ("../lib/env" → "../lib/env.js").
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src");
const EXTENSIONS = [".js", ".mjs", ".jsx"];

function withExtension(filePath) {
  if (existsSync(filePath) && statSync(filePath).isFile()) return filePath;
  for (const ext of EXTENSIONS) {
    if (existsSync(filePath + ext)) return filePath + ext;
  }
  for (const ext of EXTENSIONS) {
    const index = path.join(filePath, `index${ext}`);
    if (existsSync(index)) return index;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  let target = null;

  if (specifier.startsWith("@/")) {
    target = withExtension(path.join(SRC_DIR, specifier.slice(2)));
  } else if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    context.parentURL?.startsWith("file:")
  ) {
    const parentDir = path.dirname(fileURLToPath(context.parentURL));
    target = withExtension(path.resolve(parentDir, specifier));
  }

  if (target) return nextResolve(pathToFileURL(target).href, context);
  return nextResolve(specifier, context);
}
