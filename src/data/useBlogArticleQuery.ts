import { StrapiBlogArticleData } from "@/types/strapi-types";
import { useQuery } from "@tanstack/react-query";

type BlogArticleProps = {
  limit?: number;
  blogArticleSlug?: string;
  category?: string;
};

export const useBlogArticleQuery = ({
  category,
  blogArticleSlug,
  limit = 1,
}: BlogArticleProps) => {
  const queryCategoryRoute = category
    ? `&filters[category][slug][$eq]=${category}`
    : "";

  const filterBySlug = blogArticleSlug
    ? `&filters[slug][$eq]=${blogArticleSlug}`
    : "";

  const articleLimit = limit ? `&pagination[limit]=${limit}` : "";

  return useQuery<StrapiBlogArticleData>({
    queryKey: ["blog-article", category, limit],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-articles?populate=deep,5${queryCategoryRoute}${filterBySlug}${articleLimit}&sort=createdAt:desc`,
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
