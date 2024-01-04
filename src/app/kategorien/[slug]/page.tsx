"use client";

import { useBlogArticleQuery } from "@/data/useBlogArticleQuery";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { data } = useBlogArticleQuery({ category: params.slug });
  const pathName = usePathname();

  const blogArticles = data?.data;

  const categoryData =
    blogArticles?.[0]?.attributes?.category?.data?.attributes;

  return (
    <section>
      <h1>{categoryData?.name}</h1>
      <ul>
        {blogArticles?.map(({ attributes: { slug, title } }) => (
          <li key={slug}>
            <Link href={`${pathName}/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
