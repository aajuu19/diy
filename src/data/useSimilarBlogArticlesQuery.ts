import { StrapiBlogArticleData } from "@/types/strapi-types";
import { useQuery } from "@tanstack/react-query";

type SimilarBlogArticleProps = {
  blogArticleSlug: string;
  category?: string;
};

export const useSimilarBlogArticlesQuery = ({
  blogArticleSlug,
  category,
}: SimilarBlogArticleProps) => {
  const queryCategoryRoute = category
    ? `&filters[category][slug][$eq]=${category}`
    : "";
  const filterOutSlug = `&filters[slug][$ne]=${blogArticleSlug}`;
  const maxArticles = 5;

  return useQuery<StrapiBlogArticleData>({
    queryKey: ["similar-blog-article"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-articles?populate=*${filterOutSlug}${queryCategoryRoute}&pagination[limit]=${maxArticles}`,
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
