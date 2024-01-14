import { StrapiCategories } from "@/types/strapi-types";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesQuery = () => {
  return useQuery<StrapiCategories>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?populate=deep,3`,
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
