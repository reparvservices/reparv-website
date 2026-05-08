import fs from "fs";
import path from "path";

const SRC = path.join(process.cwd(), "src");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".next") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(jsx|js)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function relImport(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).replace(/\\/g, "/");
  if (!r.startsWith(".")) r = "./" + r;
  return r;
}

function migrate(text, file) {
  if (!text.includes("react-router-dom")) return null;

  const navLinkImport = `import NavLink from "${relImport(file, path.join(SRC, "components/NavLinkNext.jsx"))}";\n`;

  let t = text;

  // Drop react-router import lines and collect symbols
  const rrRegex =
    /import\s+\{([^}]+)\}\s+from\s+["']react-router-dom["'];?\s*\n/g;
  const symbols = new Set();
  let m;
  while ((m = rrRegex.exec(text)) !== null) {
    m[1].split(",").forEach((s) => {
      const x = s.trim();
      if (x) symbols.add(x);
    });
  }
  t = t.replace(rrRegex, "");

  const needs = {
    Link: false,
    NavLink: false,
    useRouter: false,
    usePathname: false,
    useParams: false,
    useLayoutScroll: false,
  };

  for (const s of symbols) {
    if (s === "Link") needs.Link = true;
    else if (s === "NavLink") needs.NavLink = true;
    else if (s === "useNavigate") needs.useRouter = true;
    else if (s === "useLocation") needs.usePathname = true;
    else if (s === "useParams") needs.useParams = true;
    else if (s === "useOutletContext") needs.useLayoutScroll = true;
    else if (s === "Navigate") {
      /* unused in project */
    } else {
      throw new Error(`${file}: unknown react-router export: ${s}`);
    }
  }

  const insert = [];
  if (needs.Link) insert.push(`import Link from "next/link";`);
  if (needs.NavLink) insert.push(navLinkImport.trim());
  const nextHooks = [];
  if (needs.useRouter) nextHooks.push("useRouter");
  if (needs.usePathname) nextHooks.push("usePathname");
  if (needs.useParams) nextHooks.push("useParams");
  if (nextHooks.length)
    insert.push(
      `import { ${nextHooks.sort().join(", ")} } from "next/navigation";`,
    );
  if (needs.useLayoutScroll) {
    const p = relImport(file, path.join(SRC, "context/LayoutScrollContext.jsx"));
    insert.push(`import { useLayoutScroll } from "${p}";`);
  }

  const block = insert.join("\n") + "\n";

  if (t.startsWith('"use client"')) {
    const idx = t.indexOf("\n\n");
    t = idx === -1 ? t + "\n" + block : t.slice(0, idx + 2) + block + t.slice(idx + 2);
  } else {
    t = block + t;
  }

  t = t.replace(/useOutletContext\(\)/g, "useLayoutScroll()");
  t = t.replace(
    /const navigate = useNavigate\(\)/g,
    "const router = useRouter()",
  );
  t = t.replace(/\bconst location = usePathname\(\)/g, "const pathname = usePathname()");
  t = t.replace(/\blocation\.pathname\b/g, "pathname");

  t = t.replace(/navigate\(-1\)/g, "router.back()");
  t = t.replace(
    /navigate\("\/",\s*\{\s*replace:\s*true\s*\}\)/g,
    'router.replace("/")',
  );
  t = t.replace(
    /navigate\("\/404",\s*\{\s*replace:\s*true\s*\}\)/g,
    'router.replace("/404")',
  );
  t = t.replace(/\bnavigate\(/g, "router.push(");

  t = t.replace(/\bto=\{/g, "href={");
  t = t.replace(/\bto="/g, 'href="');
  t = t.replace(/\bto='/g, "href='");

  return t;
}

for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, "utf8");
  try {
    const out = migrate(text, file);
    if (out) fs.writeFileSync(file, out);
  } catch (e) {
    console.error(file, e.message);
    process.exit(1);
  }
}

console.log("Migration pass complete");
