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
    queryKey: ["blog-article", category],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-articles?populate[0]=materialList.linkList&populate[1]=materialList.linkList.articleImg&populate[2]=previewImage&populate[3]=stepSection.steps&populate[4]=stepSection.steps.media&populate[5]=stepSection.headline&populate[6]=tips&populate[7]=youtubeSection.headline&populate[8]=faqSection.headline&populate[9]=faqSection.faqItems&populate[10]=category&populate[11]=tagList${queryCategoryRoute}${filterBySlug}${articleLimit}`,
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
