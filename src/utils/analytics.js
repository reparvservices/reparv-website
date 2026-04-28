export const addVisitor = async ({ URI, propertyid, source = "direct" }) => {
  if (!propertyid) return;

  try {
    const response = await fetch(`${URI}/admin/propertyAnalytics/addvisits`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyid,
        source, // direct | whatsapp | call | share
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Analytics error:", error.message);
      return;
    }

    const data = await response.json();
    console.log("Visitor tracked:", data);
  } catch (error) {
    console.error("Analytics request failed:", error);
  }
};

export const addBlogVisitor = async ({
  URI,
  blog_id,
  source,
}) => {
  if (!blog_id) return;

  try {
    const response = await fetch(`${URI}/admin/blogAnalytics/addvisits`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blog_id,
        source,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Blog analytics error:", error.message);
      return;
    }

    const data = await response.json();
    console.log("Blog visitor tracked:", data);
  } catch (error) {
    console.error("Blog analytics request failed:", error);
  }
};

export const addNewsVisitor = async ({
  URI,
  news_id,
  source,
}) => {
  if (!news_id) return;

  try {
    const response = await fetch(`${URI}/admin/newsAnalytics/addvisits`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        news_id,
        source,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Blog analytics error:", error.message);
      return;
    }

    const data = await response.json();
    console.log("News visitor tracked:", data);
  } catch (error) {
    console.error("News analytics request failed:", error);
  }
};
