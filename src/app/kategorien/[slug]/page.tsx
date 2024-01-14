"use client";

import { Container, Headline, Text } from "@/components/common";
import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const [limit, setLimit] = useState(10);
  const { data } = useBlogArticleQuery({ category: params.slug, limit: limit });
  const pathName = usePathname();

  const blogArticles = data?.data;

  const categoryData =
    blogArticles?.[0]?.attributes?.category?.data?.attributes;

  if (!categoryData) {
    return (
      <Container className="flex flex-col gap-4">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
      </Container>
    );
  }

  return (
    <section>
      <Container>
        <Headline as="h1" variant="h1">
          {categoryData?.name ?? <div className="skeleton h-4 w-full" />}
        </Headline>
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${categoryData?.previewImage?.data?.attributes?.url}`}
            fill
            alt={
              categoryData?.previewImage?.data?.attributes?.alternativeText ??
              ""
            }
            className="object-cover object-center"
          />
        </div>
        <div className="flex justify-between col-span-12 border-b border-border items-center">
          <div className="*:text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/kategorien">Kategorien</Link>
              </li>
              <li>{categoryData.name}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          {blogArticles?.map(
            ({
              attributes: { slug, title, introductionText, previewImage },
            }) => (
              <div key={slug}>
                <Link
                  href={`${pathName}/${slug}`}
                  className="flex flex-col md:flex-row gap-x-6 hover:bg-primary hover:bg-opacity-10 p-6 rounded-lg border-b border-border transition-colors duration-300 group"
                >
                  <div className="relative w-full md:w-1/3 rounded-lg overflow-hidden min-h-48">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                      fill
                      alt={
                        categoryData?.previewImage?.data?.attributes
                          ?.alternativeText ?? ""
                      }
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-2/3 py-12 gap-4">
                    <Headline as="span" variant="h4">
                      {title}
                    </Headline>
                    <div className="line-clamp-2">
                      <Text content={introductionText} />
                    </div>
                    <button className="btn btn-primary self-start">
                      Blogartikel lesen
                    </button>
                  </div>
                </Link>
              </div>
            )
          )}
          <button
            className="btn btn-primary mt-14"
            onClick={() => {
              setLimit((prev) => prev + 10);
            }}
          >
            Mehr laden
          </button>
        </div>
      </Container>
    </section>
  );
}
