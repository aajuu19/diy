import { StrapiComments } from "@/types/strapi-types";
import { useQuery } from "@tanstack/react-query";

type CommentsProps = { blogId?: number };

export const useGetCommentsQuery = ({ blogId }: CommentsProps) => {
  return useQuery<StrapiComments>({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments?populate=deep,2&filters[blog_article][id][$eq]=${blogId}&sort=createdAt:desc`,
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
