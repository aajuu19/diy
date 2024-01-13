"use client";

import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";
import { Container, Headline, Text } from "../common";
import Image from "next/image";
import { clsx } from "clsx";
import { formatUtils } from "@/utils/formatter";
import Link from "next/link";

type NewestBlogArticlesProps = {};

export const NewestBlogArticles: React.FC<NewestBlogArticlesProps> = () => {
  const { data } = useBlogArticleQuery({ limit: 5 });

  const blogArticles = data?.data;

  return (
    <section className="mt-10">
      <Container className="border-b border-border pb-6 grid grid-cols-12 grid-rows-4 gap-x-6">
        {blogArticles &&
          !!blogArticles.length &&
          blogArticles?.map(
            (
              {
                id,
                attributes: {
                  previewImage,
                  title,
                  introductionText,
                  publishedAt,
                  tagList,
                  category,
                  slug,
                },
              },
              index
            ) => {
              if (index === 0)
                return (
                  <div key={id} className="row-span-4 col-span-6 relative">
                    <figure className="relative w-full h-full z-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                        alt={
                          previewImage?.data?.attributes?.alternativeText ?? ""
                        }
                        fill
                        className="object-cover"
                      />
                      <div className="bg-gradient-to-t from-black absolute inset-0 z-0" />
                    </figure>
                    <div className="absolute bottom-0 p-6 z-10 text-white">
                      <Headline as="span" variant="h4">
                        {title}
                      </Headline>
                      <div className="line-clamp-3">
                        {introductionText && index === 0 && (
                          <Text content={introductionText} isSpan />
                        )}
                      </div>
                      <div className="mt-6">
                        <button className="btn btn-primary">
                          Mehr erfahren
                        </button>
                      </div>
                    </div>
                  </div>
                );

              return (
                <Link
                  href={`/kategorien/${category.data.attributes.slug}/${slug}`}
                  key={id}
                  className={clsx(
                    "col-span-6 row-span-1 grid grid-cols-3 group",
                    index !== blogArticles.length - 1 &&
                      "border-b border-border pb-4",
                    index !== 1 && "pb-4 pt-4"
                  )}
                >
                  <figure className="relative h-full flex-1 col-span-1">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                      alt={
                        previewImage?.data?.attributes?.alternativeText ?? ""
                      }
                      fill
                      className="object-cover"
                    />
                  </figure>
                  <div className="pl-4 col-span-2">
                    <span className="text-sm text-gray-600">
                      {formatUtils.formatDate(publishedAt)}
                    </span>
                    <Headline
                      as="span"
                      variant="h5"
                      className="transition-colors group-hover:text-primary"
                    >
                      {title}
                    </Headline>
                    <div className="line-clamp-3">
                      {introductionText && index === 0 && (
                        <Text content={introductionText} isSpan />
                      )}
                    </div>
                    {tagList && !!tagList?.length && (
                      <div className="flex gap-2">
                        {tagList.map(({ label }) => (
                          <div key={label} className="badge badge-outline">
                            {label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            }
          )}
      </Container>
    </section>
  );
};
