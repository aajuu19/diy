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
      materialList: {
        id: number;
        title: string;
        linkList: {
          id: number;
          label: string;
          url: string;
          articleImg: StrapiImage | null;
        }[];
      };
      stepSection: StrapiStepSection;
      previewImage: {
        id: number;
        data: {
          attributes: StrapiImage;
        };
      };
      tips: {
        label: string;
      }[];
      tagList: {
        label: string;
      }[];
      category: { data: { attributes: StrapiCategory } };
      conclusion: BlocksContent;
      youtubeSection: {
        id: number;
        headline: StrapiHeadline;
        embedId: string;
        source: string;
      };
      faqSection: StrapiFaqSection;
    };
  }[];
};

export type StrapiFaqSection = {
  headline: StrapiHeadline;
  faqItems: {
    id: number;
    question: string;
    answer: string;
  }[];
};

export type StrapiStepType = {
  id: number;
  title: string;
  description: BlocksContent;
  media: {
    data: {
      attributes: StrapiImage | null;
    };
  };
};

type StrapiStepSection = {
  id: number;
  headline: StrapiHeadline;
  steps: StrapiStepType[];
  outroText: BlocksContent;
};

export type StrapiHeadline = {
  id: number;
  as: HeadlineTypes | "span";
  variant: HeadlineTypes;
  content: string;
};
