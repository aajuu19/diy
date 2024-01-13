"use client";
import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";
import Image from "next/image";
import { Container, Headline, Text } from "@/components/common";
import { formatUtils } from "@/utils/formatter";
import { AuthorIcon } from "@/components/icons";
import { useSimilarBlogArticlesQuery } from "@/data/useSimilarBlogArticlesQuery";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialShareButtons } from "@/components/common/SocialShareButtons";
import { StepSection } from "@/components/sections/StepSection";
import { YoutubeSection } from "@/components/sections";
import { FaqSection } from "@/components/sections/FaqSection";

export default function Page({
  params,
}: Readonly<{ params: { slug: string; blogSlug: string } }>) {
  const { data } = useBlogArticleQuery({ blogArticleSlug: params.blogSlug });
  const { data: rawSimilarBlogData } = useSimilarBlogArticlesQuery({
    blogArticleSlug: params.blogSlug,
    category: params.slug,
  });

  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];

  const articleData = data?.data?.[0]?.attributes;
  const imageData = articleData?.previewImage?.data?.attributes;

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
              alt={imageData?.alternativeText ?? ""}
              className="object-cover object-center"
            />
          </div>
        )}
        {articleData?.introductionText && (
          <div className="pt-6 grid grid-cols-12 gap-x-12 gap-y-6">
            <div className="flex justify-between col-span-12 border-b border-border items-center">
              <div className="*:text-sm breadcrumbs">
                <ul>
                  <li>
                    <Link href="/kategorien">Kategorien</Link>
                  </li>
                  <li>
                    <Link href={`/kategorien/${params.slug}`}>
                      {articleData?.category?.data?.attributes?.name}
                    </Link>
                  </li>
                  <li>{articleData?.title}</li>
                </ul>
              </div>
              <SocialShareButtons />
            </div>
            <article className="col-span-8">
              <Text content={articleData?.introductionText} />
              {materialListData && (
                <div className="border-b border-border pb-4 mb-4 mt-10">
                  <span className="font-bold text-xl bg-secondary text-primary-content p-2 block mb-4">
                    {materialListData?.title}
                  </span>
                  {materialListData?.linkList && (
                    <ul className="tool-list">
                      {materialListData?.linkList?.map(({ label, url }) => (
                        <li key={url + label}>
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Der Artikel wird in einem neuen Tab geöffnet"
                          >
                            {label}
                          </Link>
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
                  className="mt-10 border-b border-border pb-4 mb-10"
                />
              )}

              {articleData?.tips && !!articleData?.tips?.length && (
                <div className="border-b border-border pb-4 mb-10">
                  <Headline
                    variant="h4"
                    as="span"
                    className="mb-4 bg-secondary text-primary-content p-2"
                  >
                    Tipps & Tricks:
                  </Headline>
                  <ul className="tip-list">
                    {articleData?.tips?.map(({ label }, index) => (
                      <li key={index}>{label}</li>
                    ))}
                  </ul>
                </div>
              )}

              {articleData?.youtubeSection && (
                <YoutubeSection
                  embedId={articleData?.youtubeSection?.embedId}
                  headline={articleData?.youtubeSection?.headline}
                  source={articleData?.youtubeSection?.source}
                  className="mb-10 border-b border-border pb-4"
                />
              )}

              {articleData?.faqSection && (
                <FaqSection
                  faqItems={articleData?.faqSection?.faqItems}
                  headline={articleData?.faqSection?.headline}
                  className="mb-10 border-b border-border pb-4"
                />
              )}

              {articleData?.conclusion && (
                <>
                  <Text content={articleData?.conclusion} />
                </>
              )}
            </article>
            <aside className="col-span-4">
              <span className="font-bold text-xl bg-secondary text-primary-content p-2 block mb-4">
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
                        <div className="w-3 h-3 mt-1 rounded-full bg-secondary" />
                      </div>
                      <Link
                        href={`/${firstPath}/${params.slug}/${slug}`}
                        className="w-[200%] timeline-end border-b border-border pb-6 text-neutral transition-colors hover:text-opacity-80"
                        title={`Klicken um zu - ${title} - zu wechseln`}
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
