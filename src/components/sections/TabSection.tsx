"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useCategoriesQuery } from "@/data/useCategoriesQuery";
import { Container, Headline, Text } from "../common";
import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";

type TabSectionProps = {};

export const TabSection: React.FC<TabSectionProps> = () => {
  const { data: categoryRawData } = useCategoriesQuery();
  const [selectedTab, setSelectedTab] = useState("");

  const { data: blogRawData } = useBlogArticleQuery({
    category: selectedTab,
    limit: 4,
  });

  const { data: categoryData } = categoryRawData ?? {};
  const blogArticles = blogRawData?.data;

  useEffect(() => {
    if (categoryData?.length) {
      setSelectedTab(categoryData[0].attributes.slug);
    }
  }, [categoryData]);

  return (
    <Container className="mt-14 border-border border-b pb-14">
      <Headline as="span" variant="h2">
        Interessante Kategorien
      </Headline>
      <section>
        <div className="flex">
          {categoryData &&
            !!categoryData.length &&
            categoryData?.map(({ id, attributes: { name, slug } }, index) => (
              <div key={id} className="flex-1 mt-4">
                <button
                  className={clsx(
                    "tab p-0 border-b-2 border-border checked:border-primary !w-full block",
                    slug === selectedTab && "text-primary border-primary"
                  )}
                  onClick={() => setSelectedTab(slug)}
                >
                  {name}
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-4">
          {blogArticles &&
            !!blogArticles.length &&
            blogArticles.map(
              (
                {
                  id,
                  attributes: {
                    previewImage,
                    title,
                    introductionText,
                    slug: blogSlug,
                  },
                },
                index
              ) => (
                <Link
                  key={id}
                  href={`/kategorien/${selectedTab}/${blogSlug}`}
                  className="mt-6 flex-1 group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                      fill
                      alt={
                        previewImage?.data?.attributes?.alternativeText ?? ""
                      }
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    />
                  </div>
                  <Headline as="span" variant="h4" className="mt-4">
                    {title}
                  </Headline>
                  <div className="line-clamp-2">
                    {introductionText && (
                      <Text content={introductionText}></Text>
                    )}
                  </div>
                  <button className="btn btn-primary mt-4">
                    Mehr erfahren
                  </button>
                </Link>
              )
            )}
        </div>
      </section>
    </Container>
  );
};
