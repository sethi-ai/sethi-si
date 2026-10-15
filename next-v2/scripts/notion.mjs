// Pulls Writing, Photography and Quotes from Notion at build time.
// Without NOTION_TOKEN it writes empty content, and the site falls back to built-in data.
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("app/content.json");
const IMG = path.resolve("public/notion");
const DB = {
  writing: "3c67ebd3dad18022b227e2a8bea2dcea",
  photos: "3c67ebd3dad1806984affca604487a24",
  quotes: "3c67ebd3dad1809590aed32e0c9c1db5",
};
const token = process.env.NOTION_TOKEN;
const empty = { writing: [], photos: [], quotes: [] };

async function api(p, body) {
  const r = await fetch("https://api.notion.com/v1/" + p, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`${p}: ${r.status} ${await r.text()}`);
  return r.json();
}
async function query(id) {
  let out = [], cursor;
  do {
    const d = await api(`databases/${id}/query`, { filter: { property: "Published", checkbox: { equals: true } }, start_cursor: cursor });
    out = out.concat(d.results); cursor = d.has_more ? d.next_cursor : undefined;
  } while (cursor);
  return out;
}
const text = (p) => (p?.title || p?.rich_text || []).map((t) => t.plain_text).join("").trim();
const rich = (arr = []) => arr.map((t) => ({ t: t.plain_text, b: t.annotations.bold, i: t.annotations.italic, href: t.href }));

async function saveImage(url, name) {
  const sharp = (await import("sharp")).default;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await sharp(buf).rotate().resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(IMG, name + ".webp"));
  return `/v2/notion/${name}.webp`;
}
async function blocks(id) {
  let out = [], cursor;
  do {
    const d = await api(`blocks/${id}/children?page_size=100${cursor ? "&start_cursor=" + cursor : ""}`);
    for (const b of d.results) {
      const v = b[b.type] || {};
      if (b.type === "image") {
        const url = v.file?.url || v.external?.url;
        if (url) out.push({ type: "image", src: await saveImage(url, b.id), caption: rich(v.caption) });
      } else if (v.rich_text) out.push({ type: b.type, text: rich(v.rich_text) });
      else if (b.type === "divider") out.push({ type: "divider" });
    }
    cursor = d.has_more ? d.next_cursor : undefined;
  } while (cursor);
  return out;
}

async function main() {
  if (!token) { console.log("notion: no NOTION_TOKEN, using built-in content"); return fs.writeFile(OUT, JSON.stringify(empty)); }
  await fs.mkdir(IMG, { recursive: true });
  const w = await query(DB.writing);
  const writing = [];
  for (const p of w) {
    const pr = p.properties;
    const slug = text(pr.Slug) || p.id;
    writing.push({ id: p.id, title: text(pr.Title), slug, date: pr.Date?.date?.start || "", tag: pr.Tag?.select?.name || "", excerpt: text(pr.Excerpt), body: await blocks(p.id) });
  }
  writing.sort((a, b) => b.date.localeCompare(a.date));

  const photos = [];
  for (const p of await query(DB.photos)) {
    const pr = p.properties, f = pr.Photo?.files?.[0];
    const url = f?.file?.url || f?.external?.url;
    if (!url) continue;
    photos.push({ src: await saveImage(url, p.id), caption: text(pr.Caption) || text(pr.Location) || text(pr.Name), home: !!pr["Show on home"]?.checkbox, date: pr.Date?.date?.start || "" });
  }
  photos.sort((a, b) => b.date.localeCompare(a.date));

  const quotes = (await query(DB.quotes)).map((p) => text(p.properties.Name)).filter(Boolean);
  await fs.writeFile(OUT, JSON.stringify({ writing, photos, quotes }));
  console.log(`notion: ${writing.length} posts, ${photos.length} photos, ${quotes.length} quotes`);
}
main().catch(async (e) => { console.error("notion: failed, using built-in content —", e.message); await fs.writeFile(OUT, JSON.stringify(empty)); });
