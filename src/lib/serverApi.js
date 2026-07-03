import { getBackendUrl } from "./env";

const SSR_FETCH_OPTIONS = { cache: "no-store" };
const ISR_FETCH_OPTIONS = { next: { revalidate: 3600 } };

async function fetchJson(path, options = SSR_FETCH_OPTIONS) {
  const response = await fetch(`${getBackendUrl()}${path}`, options);
  if (!response.ok) return null;
  return response.json();
}

export async function fetchBlogs() {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/blog`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchBlogs error:", error);
    return [];
  }
}

export async function fetchBlogDetails(blogId, options = SSR_FETCH_OPTIONS) {
  try {
    const data = await fetchJson(
      `/frontend/blog/details/${blogId}`,
      options,
    );
    return data;
  } catch (error) {
    console.error("SSR fetchBlogDetails error:", error);
    return null;
  }
}

export async function fetchBlogDetailsCached(blogId) {
  return fetchBlogDetails(blogId, ISR_FETCH_OPTIONS);
}

export async function fetchNews(options = SSR_FETCH_OPTIONS) {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/news/`,
      options,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchNews error:", error);
    return [];
  }
}

export async function fetchNewsCached() {
  return fetchNews(ISR_FETCH_OPTIONS);
}

export async function fetchNewsDetails(newsId, options = SSR_FETCH_OPTIONS) {
  try {
    const data = await fetchJson(
      `/frontend/news/details/${newsId}`,
      options,
    );
    return data;
  } catch (error) {
    console.error("SSR fetchNewsDetails error:", error);
    return null;
  }
}

export async function fetchNewsDetailsCached(newsId) {
  return fetchNewsDetails(newsId, ISR_FETCH_OPTIONS);
}

export async function fetchFaqs(location) {
  try {
    const response = await fetch(
      `${getBackendUrl()}/admin/faqs/active/${encodeURIComponent(location)}`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchFaqs error:", error);
    return [];
  }
}

export async function fetchBlogFaqs(blogId, options = SSR_FETCH_OPTIONS) {
  try {
    const response = await fetch(
      `${getBackendUrl()}/admin/faqs/active/blog/${blogId}`,
      options,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchBlogFaqs error:", error);
    return [];
  }
}

export async function fetchBlogFaqsCached(blogId) {
  return fetchBlogFaqs(blogId, ISR_FETCH_OPTIONS);
}

export async function fetchPropertyDetails(id, options = SSR_FETCH_OPTIONS) {
  try {
    const data = await fetchJson(`/frontend/propertyinfo/${id}`, options);
    return data;
  } catch (error) {
    console.error("SSR fetchPropertyDetails error:", error);
    return null;
  }
}

export async function fetchPropertyDetailsCached(id) {
  return fetchPropertyDetails(id, ISR_FETCH_OPTIONS);
}

export async function fetchPropertyImages(id, options = SSR_FETCH_OPTIONS) {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/propertyinfo/getimages/${id}`,
      options,
    );
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("SSR fetchPropertyImages error:", error);
    return [];
  }
}

export async function fetchPropertyImagesCached(id) {
  return fetchPropertyImages(id, ISR_FETCH_OPTIONS);
}

export async function fetchProjectPartner(contact) {
  try {
    const data = await fetchJson(
      `/frontend/project-partner/get/${contact}`,
      SSR_FETCH_OPTIONS,
    );
    return data;
  } catch (error) {
    console.error("SSR fetchProjectPartner error:", error);
    return null;
  }
}

export async function fetchMapViewProperties(city = "Nagpur") {
  return fetchProperties({
    city,
    propertyCategory: "properties",
  });
}

export async function fetchProperties({
  city = "Nagpur",
  propertyCategory = "",
  propertyType = "",
} = {}) {
  try {
    const params = new URLSearchParams();
    if (city?.trim()) params.set("city", city.trim());
    if (propertyCategory?.trim()) {
      params.set("propertyCategory", propertyCategory.trim());
    }
    if (propertyType?.trim()) params.set("propertyType", propertyType.trim());

    const query = params.toString();
    const response = await fetch(
      `${getBackendUrl()}/frontend/properties/get-all-by-slug${query ? `?${query}` : ""}`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchProperties error:", error);
    return [];
  }
}

export async function fetchAllProperties(city = "Nagpur") {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/all-properties/${encodeURIComponent(city)}`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchAllProperties error:", error);
    return [];
  }
}

export async function fetchTrendingProperties(city = "Nagpur") {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/trending-properties/${encodeURIComponent(city)}`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchTrendingProperties error:", error);
    return [];
  }
}

export async function fetchTopPicks(city = "Nagpur") {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/all-properties/top-picks/${encodeURIComponent(city)}`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("SSR fetchTopPicks error:", error);
    return [];
  }
}

export async function fetchTestimonials() {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/testimonial`,
      SSR_FETCH_OPTIONS,
    );
    if (!response.ok) return [];
    const data = await response.json();
    const excludedClients = [
      "reparv",
      "sales partner",
      "territory partner",
      "project partner",
      "onboarding partner",
    ];
    return data.filter(
      (item) => !excludedClients.includes(item.client?.toLowerCase()),
    );
  } catch (error) {
    console.error("SSR fetchTestimonials error:", error);
    return [];
  }
}

export async function fetchHomePageData(city = "Nagpur") {
  const [
    allProperties,
    trendingProperties,
    topPicks,
    blogs,
    testimonials,
    faqs,
  ] = await Promise.all([
    fetchAllProperties(city),
    fetchTrendingProperties(city),
    fetchTopPicks(city),
    fetchBlogs(),
    fetchTestimonials(),
    fetchFaqs("Reparv Home Page"),
  ]);

  const rentalProperties = allProperties.filter((item) =>
    item.propertyCategory?.startsWith("Rental"),
  );

  return {
    rentalProperties,
    trendingProperties,
    topPicks,
    blogs,
    testimonials,
    faqs,
  };
}

export async function fetchPropertyLandingPageData(faqLocation) {
  const [properties, blogs, faqs] = await Promise.all([
    fetchAllProperties("Nagpur"),
    fetchBlogs(),
    fetchFaqs(faqLocation),
  ]);

  return {
    initialProperties: properties,
    initialBlogs: blogs,
    initialFaqs: faqs,
  };
}

export async function fetchSeoPageWidgets({
  faqLocation,
  includeArticles = true,
} = {}) {
  const requests = [];
  if (faqLocation) requests.push(fetchFaqs(faqLocation));
  if (includeArticles) requests.push(fetchBlogs());

  const results = await Promise.all(requests);

  return {
    faqs: faqLocation ? results[0] : [],
    articles: includeArticles ? results[faqLocation ? 1 : 0] : [],
  };
}
