import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type StrapiCategories = {
  data: {
    id: number;
    attributes: StrapiCategory;
  }[];
};

export type StrapiCategory = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pageTitle: string;
  metaDescription: string;
  slug: string;
};

export type StrapiBlogArticleData = {
  data: {
    id: number;
    attributes: {
      title: string;
      introductionText: BlocksContent;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      slug: string;
      category: { data: { attributes: StrapiCategory } };
    };
  }[];
};
