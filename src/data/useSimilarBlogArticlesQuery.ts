import { StrapiBlogArticleData } from "@/types/strapi-types";
import { useQuery } from "@tanstack/react-query";

type SimilarBlogArticleProps = {
  blogArticleSlug?: string;
  category?: string;
};

export const useSimilarBlogArticlesQuery = ({
  category,
}: SimilarBlogArticleProps) => {
  const queryCategoryRoute = category
    ? `&filters[category][slug][$eq]=${category}`
    : "";
  const maxArticles = 5;

  return useQuery<StrapiBlogArticleData>({
    queryKey: ["similar-blog-article"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-articles?populate=*${queryCategoryRoute}&pagination[limit]=${maxArticles}`,
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
