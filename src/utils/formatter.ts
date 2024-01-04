const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const formatUtils = {
  formatDate,
};
