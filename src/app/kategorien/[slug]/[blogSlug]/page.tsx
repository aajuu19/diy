"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";
import Image from "next/image";
import { Container, Headline } from "@/components/common";
import { formatUtils } from "@/utils/formatter";
import { AuthorIcon } from "@/components/icons";
import { useSimilarBlogArticlesQuery } from "@/data/useSimilarBlogArticlesQuery";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialShareButtons } from "@/components/common/SocialShareButtons";
import { StepSection } from "@/components/sections/StepSection";

export default function Page({
  params,
}: Readonly<{ params: { slug: string; blogSlug: string } }>) {
  const { data } = useBlogArticleQuery({ blogArticleSlug: params.blogSlug });
  const { data: rawSimilarBlogData } = useSimilarBlogArticlesQuery({
    category: params.slug,
  });

  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];

  const articleData = data?.data?.[0]?.attributes;
  const imageData = articleData?.previewImage?.data?.attributes;

  console.log(articleData);

  const materialListData = articleData?.materialList;
  const similarBlogData = rawSimilarBlogData?.data;

  return (
    <section>
      <Container>
        <Headline variant="h1" as="h1" className="pb-4">
          {articleData?.title}
        </Headline>
        {articleData?.publishedAt && (
          <div className="flex gap-2">
            <AuthorIcon className="w-6 h-6" />
            <span className="pb-4 block text-gray-500">
              Veröffentlicht am{" "}
              {formatUtils.formatDate(articleData?.publishedAt)}
            </span>
          </div>
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
          <div className="pt-6 grid grid-cols-12 gap-12">
            <article className="col-span-8">
              <SocialShareButtons className="border-b border-border pb-4 mb-4" />
              <BlocksRenderer content={articleData?.introductionText} />
              {materialListData && (
                <div className="border-b border-border pb-4 mb-4 mt-10">
                  <span className="font-bold text-xl bg-primary text-primary-content p-2 block mb-4">
                    {materialListData?.title}
                  </span>
                  {materialListData?.linkList && (
                    <ul className="tool-list">
                      {materialListData?.linkList?.map(({ label, url }) => (
                        <li key={url + label}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {articleData?.stepSection && (
                <StepSection
                  headline={articleData.stepSection.headline}
                  steps={articleData.stepSection.steps}
                  outroText={articleData.stepSection.outroText}
                  className="mt-10"
                />
              )}
            </article>
            <aside className="col-span-4">
              <span className="font-bold text-xl bg-primary text-primary-content p-2 block mb-4">
                Ähnliche Artikel
              </span>
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical -translate-x-1/2">
                {similarBlogData?.map(
                  (
                    {
                      attributes: {
                        slug,
                        title,
                        publishedAt,
                        introductionText,
                      },
                    },
                    index
                  ) => (
                    <li key={slug}>
                      <div className="timeline-middle">
                        <div className="w-3 h-3 mt-1 rounded-full bg-primary" />
                      </div>
                      <Link
                        href={`/${firstPath}/${params.slug}/${slug}`}
                        className="w-[200%] timeline-end border-b border-border pb-6"
                      >
                        <time
                          className={clsx(
                            "font-bold text-xs",
                            index !== 0 && "text-gray-500"
                          )}
                        >
                          {formatUtils.formatDate(publishedAt)}
                        </time>
                        <div className="text-lg font-black pb-2">{title}</div>
                        {introductionText?.[0].children?.[0].type ===
                          "text" && (
                          <span className="line-clamp-3">
                            {introductionText?.[0].children?.[0].text}
                          </span>
                        )}
                      </Link>
                      <hr />
                    </li>
                  )
                )}
              </ul>
            </aside>
          </div>
        )}
      </Container>
    </section>
  );
}
