"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";
import Image from "next/image";
import { Container, Headline } from "@/components/common";
import { formatUtils } from "@/utils/formatter";

export default function Page({
  params,
}: Readonly<{ params: { blogSlug: string } }>) {
  const { data } = useBlogArticleQuery({ blogArticleSlug: params.blogSlug });

  const articleData = data?.data?.[0]?.attributes;
  const imageData = articleData?.previewImage?.data?.attributes;

  return (
    <section>
      <Container>
        <Headline variant="h1" as="h1" className="pb-4">
          {articleData?.title}
        </Headline>
        {articleData?.publishedAt && (
          <span className="pb-4 block text-gray-500">
            Veröffentlicht am {formatUtils.formatDate(articleData?.publishedAt)}
          </span>
        )}
        {imageData && (
          <div className="w-full relative h-96">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData?.url}`}
              fill
              alt={imageData?.alternativeText}
              className="object-cover object-center"
            />
          </div>
        )}
        {articleData?.introductionText && (
          <BlocksRenderer content={articleData?.introductionText} />
        )}
      </Container>
    </section>
  );
}
