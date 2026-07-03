export function parsePropertiesRouteParams(params = {}) {
  const slug = params.slug;
  const propertyCategoryParam = params.propertyCategory;
  const cityParam = params.city;

  const regex = /^(\d+-?[A-Za-z]+)-(.*)-in-(.*)$/;
  const slugStr = slug != null ? String(slug) : "";
  const match = slugStr.match(regex);

  let bhkType = "";
  let propertyCategory = "";
  let city = "Nagpur";

  if (slug && propertyCategoryParam && cityParam) {
    bhkType = decodeURIComponent(String(slug)).replace(/-/g, " ") || "";
    propertyCategory = decodeURIComponent(String(propertyCategoryParam)) || "";
    city = decodeURIComponent(String(cityParam)).replace(/-/g, " ") || "";
  } else if (match) {
    bhkType = match[1].replace("-", " ") || "";
    propertyCategory = match[2] || "";
    city = match[3].replace(/-/g, " ") || "";
  } else if (slugStr) {
    city = slugStr.replace(/-/g, " ");
  }

  return {
    city: city || "Nagpur",
    propertyCategory: propertyCategory || "properties",
    propertyType: bhkType || "",
  };
}
