import fs from "fs";
import path from "path";

const site = path.join(process.cwd(), "app/(site)");

/** [file, componentName, importPath, metaPath, title, description] */
const pages = [
  ["page.jsx", "Home", "@/views/Home", "/", "Buy, Rent & Sell Verified Property in India", "Find verified homes, flats, plots and commercial listings across India on Reparv."],
  ["home/page.jsx", "Home", "@/views/Home", "/home", "Home", "Reparv home — discover properties across India."],
  ["sell-old-property/page.jsx", "SellOldProperty", "@/views/SellOldProperty", "/sell-old-property", "Sell your property", "List and sell your existing property with Reparv."],
  ["rent-property/page.jsx", "RentProperty", "@/views/RentProperty", "/rent-property", "Rent out your property", "Rent your property to verified tenants with Reparv."],
  ["buy-new-property/page.jsx", "BuyNewProperty", "@/views/BuyNewProperty", "/buy-new-property", "Buy new property", "Browse new launches and under-construction projects."],
  ["buy-resale-property/page.jsx", "BuyResaleProperty", "@/views/BuyResaleProperty", "/buy-resale-property", "Buy resale property", "Explore resale flats, plots and homes across cities."],
  ["rental-property/page.jsx", "RentalProperty", "@/views/RentalProperty", "/rental-property", "Rental property", "Find rental flats, homes and commercial spaces."],
  ["dashboard/page.jsx", "Dashboard", "@/views/Dashboard", "/dashboard", "Dashboard", "Manage your Reparv account, listings and activity."],
  ["sell-properties/page.jsx", "SellProperty", "@/components/dashboard/SellProperty", "/sell-properties", "Sell properties", "Create and manage property listings."],
  ["activities/page.jsx", "Activity", "@/views/Activity", "/activities", "Activity", "Your recent activity on Reparv."],
  ["profile/page.jsx", "Profile", "@/components/dashboard/Profile", "/profile", "Profile", "View and update your profile."],
  ["profile-edit/page.jsx", "EditProfile", "@/components/dashboard/EditProfile", "/profile-edit", "Edit profile", "Update your account details."],
  ["my-listings/page.jsx", "MyListingsMobile", "@/components/dashboard/MyListingsMobile", "/my-listings", "My listings", "Manage your property listings on mobile."],
  ["home-loan/page.jsx", "HomeLoan", "@/components/dashboard/HomeLoan", "/home-loan", "Home loan", "Home loan tools and guidance from Reparv."],
  ["home-loan-application/page.jsx", "HomeLoanForm", "@/views/HomeLoanForm", "/home-loan-application", "Home loan application", "Apply for a home loan with Reparv."],
  ["emi-calculator/page.jsx", "EmiCalculator", "@/views/EmiCalculator", "/emi-calculator", "EMI calculator", "Calculate home loan EMI instantly."],
  ["cost-calculator/page.jsx", "CostCalculator", "@/views/CostCalculator", "/cost-calculator", "Cost calculator", "Estimate property purchase costs."],
  ["rera-properties/page.jsx", "ReraProperty", "@/views/ReraProperty", "/rera-properties", "RERA properties", "Browse RERA-registered projects and listings."],
  ["verify-7-12/page.jsx", "Verify712", "@/views/Verify712", "/verify-7-12", "Verify 7/12", "Verify land records and 7/12 extracts."],
  ["trusted-builders/page.jsx", "TrustedBuilder", "@/views/TrustedBuilder", "/trusted-builders", "Trusted builders", "Discover trusted builder partners on Reparv."],
  ["visit-properties-on-week-ends/page.jsx", "VisitPropertiesOnWeekend", "@/views/VisitPropertiesOnWeekend", "/visit-properties-on-week-ends", "Visit properties on weekends", "Schedule weekend site visits."],
  ["property-details/page.jsx", "PropertyDetails", "@/views/PropertyDetails", "/property-details", "Property details", "View detailed property information."],
  ["about-us/page.jsx", "AboutUs", "@/views/AboutUs", "/about-us", "About Reparv", "Learn about Reparv and our mission."],
  ["contact-us/page.jsx", "ContactUs", "@/views/ContactUs", "/contact-us", "Contact us", "Get in touch with the Reparv team."],
  ["privacy-policy/page.jsx", "PrivacyPolicy", "@/views/PrivacyPolicy", "/privacy-policy", "Privacy policy", "How Reparv handles your data."],
  ["terms-and-conditions/page.jsx", "TermsAndConditions", "@/views/TermsAndConditions", "/terms-and-conditions", "Terms and conditions", "Terms of using Reparv."],
  ["cancellation-policy/page.jsx", "RefundPolicy", "@/views/RefundPolicy", "/cancellation-policy", "Cancellation policy", "Refunds and cancellations policy."],
  ["blogs/page.jsx", "Blog", "@/views/Blog", "/blogs", "Blogs", "Real estate guides and articles from Reparv."],
  ["news/page.jsx", "NewsPage", "@/views/NewsSection", "/news", "News", "Latest real estate news and updates."],
  ["thank-you/page.jsx", "SuccessScreen", "@/views/SuccessScreen", "/thank-you", "Thank you", "Your submission was received."],
  ["404/page.jsx", "ErrorPage", "@/views/ErrorPage", "/404", "Page not found", "This page could not be found."],
  ["check-eligibility/page.jsx", "CheckEligibility", "@/views/CheckEligibility", "/check-eligibility", "Check eligibility", "Check loan eligibility with Reparv."],
  ["join-our-team/page.jsx", "JoinOurTeam", "@/views/JoinOurTeam", "/join-our-team", "Join our team", "Partner and career opportunities at Reparv."],
  ["sales-partner/page.jsx", "JoinOurTeam", "@/views/JoinOurTeam", "/sales-partner", "Sales partner", "Become a sales partner with Reparv."],
  ["territory-partner/page.jsx", "JoinOurTeam", "@/views/JoinOurTeam", "/territory-partner", "Territory partner", "Territory partner program at Reparv."],
];

const tpl = (comp, importPath, metaPath, title, desc) => `import ${comp} from "${importPath}";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(desc)},
  path: ${JSON.stringify(metaPath)},
});

export default function Page() {
  return <${comp} />;
}
`;

for (const [rel, comp, importPath, metaPath, title, desc] of pages) {
  const dir = path.join(site, path.dirname(rel));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(site, rel), tpl(comp, importPath, metaPath, title, desc));
}

fs.mkdirSync(path.join(site, "properties"), { recursive: true });
fs.writeFileSync(
  path.join(site, "properties/page.jsx"),
  `import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Properties for sale and rent in India",
  description: "Browse verified property listings — buy, rent or invest across Indian cities.",
  path: "/properties",
});

export default function Page() {
  return <Properties />;
}
`,
);

fs.mkdirSync(path.join(site, "properties/type/[listingType]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "properties/type/[listingType]/page.jsx"),
  `import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { listingType } = params;
  return buildPageMetadata({
    title: \`Properties — \${listingType}\`,
    description: "Browse verified listings filtered by type on Reparv.",
    path: \`/properties/type/\${listingType}\`,
  });
}

export default function Page() {
  return <Properties />;
}
`,
);

fs.mkdirSync(path.join(site, "properties/[slug]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "properties/[slug]/page.jsx"),
  `import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { slug } = params;
  return buildPageMetadata({
    title: "Property listings",
    description: "Explore property listings matching your search on Reparv.",
    path: \`/properties/\${slug}\`,
  });
}

export default function Page() {
  return <Properties />;
}
`,
);

fs.mkdirSync(path.join(site, "blog/[blogId]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "blog/[blogId]/page.jsx"),
  `import BlogDetails from "@/views/BlogDetails";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { blogId } = params;
  return buildPageMetadata({
    title: "Blog article",
    description: "Read this article on the Reparv blog.",
    path: \`/blog/\${blogId}\`,
  });
}

export default function Page() {
  return <BlogDetails />;
}
`,
);

fs.mkdirSync(path.join(site, "news/[newsId]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "news/[newsId]/page.jsx"),
  `import NewsDetailsPage from "@/views/NewsDetailsPage";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { newsId } = params;
  return buildPageMetadata({
    title: "News",
    description: "Read the latest real estate news on Reparv.",
    path: \`/news/\${newsId}\`,
  });
}

export default function Page() {
  return <NewsDetailsPage />;
}
`,
);

fs.mkdirSync(path.join(site, "edit-property/[id]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "edit-property/[id]/page.jsx"),
  `import EditProperty from "@/components/dashboard/EditProperty";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { id } = params;
  return buildPageMetadata({
    title: "Edit property",
    description: "Update your property listing on Reparv.",
    path: \`/edit-property/\${id}\`,
  });
}

export default function Page() {
  return <EditProperty />;
}
`,
);

fs.mkdirSync(path.join(site, "property-info/[id]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "property-info/[id]/page.jsx"),
  `import PropertyDetails from "@/views/PropertyDetails";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { id } = params;
  return buildPageMetadata({
    title: "Property details",
    description: "View photos, pricing and location for this listing on Reparv.",
    path: \`/property-info/\${id}\`,
  });
}

export default function Page() {
  return <PropertyDetails />;
}
`,
);

fs.mkdirSync(path.join(site, "[bhkType]/[propertyCategory]/in/[city]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "[bhkType]/[propertyCategory]/in/[city]/page.jsx"),
  `import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { bhkType, propertyCategory, city } = params;
  return buildPageMetadata({
    title: \`\${bhkType} \${propertyCategory} in \${city}\`,
    description: "Browse matching verified property listings on Reparv.",
    path: \`/\${bhkType}/\${propertyCategory}/in/\${city}\`,
  });
}

export default function Page() {
  return <Properties />;
}
`,
);

fs.mkdirSync(path.join(site, "[slug]"), { recursive: true });
fs.writeFileSync(
  path.join(site, "[slug]/page.jsx"),
  `import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { slug } = params;
  return buildPageMetadata({
    title: "Property listings",
    description: "Explore property listings on Reparv.",
    path: \`/\${slug}\`,
  });
}

export default function Page() {
  return <Properties />;
}
`,
);

console.log("ok");
