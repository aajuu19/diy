"use client";

import { Container } from "@/components/common";
import { useCategoriesQuery } from "@/data/useCategoriesQuery";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  const { data, isLoading, isError } = useCategoriesQuery();
  const pathname = usePathname();

  const categories = data?.data;

  return (
    <section>
      <Container>
        <h1>Kategorien</h1>

        {isLoading || !data ? (
          <>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </>
        ) : (
          <ul>
            {categories?.map(({ attributes: { slug, name } }) => (
              <li key={slug}>
                <Link href={`${pathname}/${slug}`}>{name}</Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
