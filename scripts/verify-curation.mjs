import fs from "node:fs/promises";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { posts, curation, archiveCanonical } from "../src/lib/content.mjs";
const hashes = new Map();
for (const p of posts) {
  const h = crypto
    .createHash("sha256")
    .update(p.plain.replace(/\s+/g, ""))
    .digest("hex");
  assert.ok(
    !hashes.has(h),
    `Duplicate published body: ${p.slug} / ${hashes.get(h)}`,
  );
  hashes.set(h, p.slug);
}
for (const m of curation.merges) {
  assert.ok(!posts.some((p) => p.slug === m.source));
  assert.ok(posts.some((p) => p.slug === m.target));
}
const assets = JSON.parse(
  await fs.readFile("content/asset-merges.json", "utf8"),
);
for (const a of assets.media) {
  await fs.access(a.keeper);
  assert.equal(
    await fs
      .access(a.removed)
      .then(() => true)
      .catch(() => false),
    false,
    `Duplicate media returned: ${a.removed}`,
  );
}
console.log(
  `Verified ${posts.length} unique published bodies, ${curation.merges.length} merged entry aliases, ${archiveCanonical.size} shared historical bodies and ${assets.media.length} media consolidations.`,
);
