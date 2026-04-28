export function aggregateChartData(data = [], range = "month") {
  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.created_at);
    let label = "";

    if (range === "week") {
      label = date.toLocaleDateString("en-US", { weekday: "short" });
    }

    if (range === "month") {
      label = date.toLocaleDateString("en-US", { month: "short" });
    }

    if (range === "year") {
      label = date.getFullYear().toString();
    }

    if (!grouped[label]) {
      grouped[label] = {
        label,
        views: 0,
        performance: 0,
      };
    }

    grouped[label].views += item.views;
    grouped[label].performance += item.performance;
  });

  return Object.values(grouped);
}