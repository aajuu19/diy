"use client";

import { Container, Headline } from "@/components/common";
import { useCategoriesQuery } from "@/data/useCategoriesQuery";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  const { data, isLoading, isError } = useCategoriesQuery();
  const pathname = usePathname();

  const categories = data?.data;

  return (
    <section>
      <Container>
        <Headline as="h1" variant="h1">
          DIY Kategorien: Entdecken Sie die Kunst des Selbst Gestaltens
        </Headline>

        {isLoading || !data ? (
          <>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {categories?.map(({ attributes: { slug, name, previewImage } }) => (
              <div key={slug} className="col-span-4">
                <Link href={`${pathname}/${slug}`}>
                  <div className="relative h-64 overflow-hidden rounded-lg group">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                      fill
                      alt={
                        previewImage?.data?.attributes?.alternativeText ?? ""
                      }
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Headline as="span" variant="h4" className="mt-4">
                    {name}
                  </Headline>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>

      <Container className="border-t border-border mt-14 pt-14">
        <p>
          Willkommen in der Welt des DIY – dem Zuhause für alle, die Freude am
          Selbst Gestalten und Selbst Machen haben. In dieser Kategorie finden
          Sie eine Fülle an inspirierenden Ideen, Anleitungen und Tipps, die
          Ihnen helfen, Ihre Kreativität voll auszuschöpfen. Ob Sie Ihre eigenen
          Möbel bauen, individuelle Dekorationen kreieren oder einzigartige
          Geschenke selbst gestalten möchten, hier sind Sie genau richtig. Unser
          Ziel bei [Ihr Blogname] ist es, Ihnen nicht nur praktisches Know-how
          zu vermitteln, sondern auch Ihre Leidenschaft für DIY-Projekte zu
          entfachen. Entdecken Sie mit uns die unendlichen Möglichkeiten des
          Selbermachens!
        </p>
      </Container>
    </section>
  );
}
