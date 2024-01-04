import type { BlocksContent } from "@strapi/blocks-react-renderer";

type Thumbnail = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
};

type Formats = {
  thumbnail: Thumbnail;
  medium: Thumbnail;
  small: Thumbnail;
  large: Thumbnail;
};

export type StrapiImage = {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
};

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
      previewImage: {
        id: number;
        data: {
          attributes: StrapiImage;
        };
      };
      category: { data: { attributes: StrapiCategory } };
    };
  }[];
};
