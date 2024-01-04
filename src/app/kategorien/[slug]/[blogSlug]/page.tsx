"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";

export default function Page({
  params,
}: Readonly<{ params: { blogSlug: string } }>) {
  const { data } = useBlogArticleQuery({ blogArticleSlug: params.blogSlug });

  const articleData = data?.data?.[0]?.attributes;

  return (
    <section>
      <h1>{articleData?.title}</h1>
      {articleData?.introductionText && (
        <BlocksRenderer content={articleData?.introductionText} />
      )}
    </section>
  );
}
