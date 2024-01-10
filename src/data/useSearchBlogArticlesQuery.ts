import { useQuery } from "@tanstack/react-query";
import { StrapiBlogArticleData } from "@/types/strapi-types";

export const useSearchBlogArticlesQuery = (searchTerm: string) => {
  const maxArticles = 5;

  return useQuery<StrapiBlogArticleData>({
    queryKey: ["search-blog-article", searchTerm],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-articles?filters[title][$contains]=${searchTerm}&populate=*&pagination[limit]=${maxArticles}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );

      if (!res.ok) throw new Error("An error occurred.");

      return res.json();
    },
    enabled: searchTerm.length >= 3,
  });
};
