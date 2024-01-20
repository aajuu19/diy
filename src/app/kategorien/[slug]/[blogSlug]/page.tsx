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
import { useGetCommentsQuery } from "@/data/useGetComments";
import { CommentForm } from "@/components/sections/CommentSection";
import { useState } from "react";

export default function Page({
  params,
}: Readonly<{ params: { slug: string; blogSlug: string } }>) {
  const [currentAnchor, setCurrentAnchor] = useState("");
  const { data } = useBlogArticleQuery({ blogArticleSlug: params.blogSlug });
  const { data: rawSimilarBlogData } = useSimilarBlogArticlesQuery({
    blogArticleSlug: params.blogSlug,
    category: params.slug,
  });
  const { data: comments } = useGetCommentsQuery({
    blogId: data?.data?.[0]?.id,
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
          <div className="w-full relative h-96 rounded-lg overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData?.url}`}
              fill
              alt={imageData?.alternativeText ?? ""}
              className="object-cover object-center"
            />
          </div>
        )}

        {articleData?.introductionText && (
          <div className="pt-6 grid grid-cols-12 md:gap-x-12 gap-y-6">
            <div className="md:flex pb-4 md:pb-0 justify-between col-span-12 border-b border-border items-center">
              <div className="*:text-sm breadcrumbs">
                <ul className="flex-wrap whitespace-break-spaces md:flex-nowrap md:whitespace-normal">
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
            <article className="col-span-12 md:col-span-8">
              <Text content={articleData?.introductionText} />

              {materialListData && (
                <div
                  className="border-b border-border pb-4 mb-4 mt-10"
                  id="materialien-werkzeuge"
                >
                  <span className="font-bold text-xl bg-secondary text-primary-content py-2 px-4 block mb-4 rounded-lg">
                    {materialListData?.title}
                  </span>

                  {materialListData?.linkList && (
                    <ul className="tool-list">
                      {materialListData?.linkList?.map(({ label, url }) => {
                        return url ? (
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
                        ) : (
                          <li key={url + label}>{label}</li>
                        );
                      })}
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
                <div
                  className="border-b border-border pb-4 mb-10"
                  id="tipps-tricks"
                >
                  <Headline
                    variant="h4"
                    as="span"
                    className="mb-4 bg-secondary text-primary-content py-2 px-4 rounded-lg"
                  >
                    Tipps & Tricks:
                  </Headline>
                  <ul className="tip-list">
                    {articleData?.tips?.map(({ label }) => (
                      <li key={label}>{label}</li>
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
                <Text content={articleData?.conclusion} />
              )}

              {data?.data[0].id && <CommentForm blogId={data?.data[0].id} />}

              {comments && !!comments.data.length ? (
                <div className="border-t border-border mt-14 pt-14 flex flex-col gap-6">
                  {comments?.data?.map(
                    ({ attributes: { author, text, publishedAt } }) => (
                      <div
                        key={author + text}
                        className="border-border border rounded-xl p-4 flex gap-4"
                      >
                        <div>
                          <div className="bg-secondary w-14 h-14 text-primary-content font-bold flex items-center justify-center rounded-full">
                            {author.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-4">
                            <Headline as="span" variant="h5" className="!mb-0">
                              {author}
                            </Headline>
                            <span className="w-2 h-2 bg-secondary rounded-full" />
                            <span>{formatUtils.formatDate(publishedAt)}</span>
                          </div>
                          <p>{text}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <span className="mt-14 pt-14 border-t border-border block">
                  Es sind noch keine Kommentare vorhanden. Möchtest Du den
                  Ersten schreiben?
                </span>
              )}
            </article>
            <aside className="col-span-12 md:col-span-4 sticky top-20 self-start">
              <span className="font-bold text-xl bg-secondary text-primary-content py-2 px-4 block mb-4 rounded-lg">
                Inhaltsverzeichnis
              </span>
              <ul className="general-list">
                <li>
                  <Link href="#materialien-werkzeuge">
                    Materialien und Werkzeuge
                  </Link>
                </li>
                <li>
                  <Link href="#schritt-fuer-schritt-anleitung">
                    Schritt-für-Schritt-Anleitung
                  </Link>
                </li>
                <li>
                  <Link href="#tipps-tricks">Tipps & Tricks</Link>
                </li>
                <li>
                  <Link href="#video-anleitung">Videoanleitung</Link>
                </li>
                <li>
                  <Link href="#faq">FAQ - Häufig gestellte Fragen</Link>
                </li>
                <li>
                  <Link href="#kommentare">Kommentare</Link>
                </li>
              </ul>

              <span className="font-bold text-xl bg-secondary text-primary-content py-2 px-4 block mb-4 rounded-lg mt-10">
                Ähnliche Artikel
              </span>
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical md:-translate-x-1/2">
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
                        className="md:w-[200%] timeline-end border-b border-border pb-6 text-neutral transition-colors hover:text-opacity-80"
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
