import { StrapiBlogArticleData } from "@/types/strapi-types";
import { useQuery } from "@tanstack/react-query";

type BlogArticleProps = {
  blogArticleSlug?: string;
  category?: string;
};

export const useBlogArticleQuery = ({
  category,
  blogArticleSlug,
}: BlogArticleProps) => {
  const queryCategoryRoute = category
    ? `&filters[category][slug][$eq]=${category}`
    : "";

  const filterBySlug = blogArticleSlug
    ? `&filters[slug][$eq]=${blogArticleSlug}`
    : "";

  return useQuery<StrapiBlogArticleData>({
    queryKey: ["blog-article"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-articles?populate=*${queryCategoryRoute}${filterBySlug}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );

      if (!res.ok) throw new Error("Ein Fehler ist aufgetreten.");

      return res.json();
    },
  });
};
