import { test } from "node:test";
import assert from "node:assert/strict";
import {
  siteUrl,
  defaultOgImage,
  resolveOgImageUrl,
  buildPageMetadata,
  buildNoIndexMetadata,
  buildListingPageMetadata,
  buildFaqPageSchema,
  buildBreadcrumbListSchema,
} from "../../src/lib/seo/index.js";
import { getS3ImageUrl } from "../../src/lib/env.js";

test("buildPageMetadata: canonical, brand suffix, default OG image", () => {
  const m = buildPageMetadata({ title: "EMI Calculator", description: "d", path: "emi-calculator" });
  assert.equal(m.title, "EMI Calculator");
  assert.equal(m.alternates.canonical, `${siteUrl}/emi-calculator`);
  assert.equal(m.openGraph.title, "EMI Calculator | Reparv");
  assert.equal(m.openGraph.url, m.alternates.canonical);
  assert.equal(m.openGraph.images[0].url, defaultOgImage);
  assert.deepEqual(m.twitter.images, [defaultOgImage]);
});

test("buildPageMetadata: home path has no trailing slash", () => {
  assert.equal(buildPageMetadata({ title: "Home" }).alternates.canonical, siteUrl);
});

test("buildPageMetadata strips existing brand suffix (no double '| Reparv')", () => {
  const m = buildPageMetadata({ title: "About Us | Reparv.in" });
  assert.equal(m.title, "About Us");
  assert.equal(m.openGraph.title, "About Us | Reparv");
  assert.equal(buildPageMetadata({}).title, "Reparv");
});

test("resolveOgImageUrl handles absolute, /assets and S3 keys", () => {
  assert.equal(resolveOgImageUrl("https://cdn/x.jpg"), "https://cdn/x.jpg");
  assert.equal(resolveOgImageUrl("/assets/a.png"), `${siteUrl}/assets/a.png`);
  assert.equal(resolveOgImageUrl("/uploads/a.png"), `${getS3ImageUrl().replace(/\/$/, "")}/uploads/a.png`);
  assert.equal(resolveOgImageUrl(""), undefined);
  assert.equal(resolveOgImageUrl(null), undefined);
});

test("buildNoIndexMetadata sets robots noindex", () => {
  assert.deepEqual(buildNoIndexMetadata({ title: "x" }).robots, { index: false, follow: false });
});

test("buildListingPageMetadata variants", () => {
  const bhk = buildListingPageMetadata({ params: { slug: "2-BHK-NewFlat-in-Nagpur" }, path: "/x" });
  assert.equal(bhk.title, "2 BHK NewFlat in Nagpur | Verified Properties");

  const city = buildListingPageMetadata({ params: { slug: "Pune" }, path: "/x" });
  assert.equal(city.title, "Properties in Pune | Verified Listings");

  const type = buildListingPageMetadata({ params: { listingType: "rent" }, path: "/x" });
  assert.equal(type.title, "rent Properties in Nagpur");
});

test("FAQ and breadcrumb schema", () => {
  assert.equal(buildFaqPageSchema([]), null);
  const faq = buildFaqPageSchema([{ question: "Q", answer: "A" }]);
  assert.equal(faq["@type"], "FAQPage");
  assert.equal(faq.mainEntity[0].acceptedAnswer.text, "A");

  assert.equal(buildBreadcrumbListSchema([]), null);
  const bc = buildBreadcrumbListSchema([{ label: "Home", href: "/" }, { label: "Blogs", href: "blogs" }, { label: "Post" }]);
  assert.deepEqual(bc.itemListElement.map((i) => i.position), [1, 2, 3]);
  assert.equal(bc.itemListElement[1].item, `${siteUrl}/blogs`);
  assert.equal(bc.itemListElement[2].item, undefined);
});
