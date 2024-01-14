"use client";

import Link from "next/link";
import { Container, Text } from "../common";
import { SearchIcon } from "../icons";
import { useSearchBlogArticlesQuery } from "@/data/useSearchBlogArticlesQuery";
import { useState } from "react";
import clsx from "clsx";
import { Logo } from "../icons/Logo";
import Image from "next/image";

type NavigationProps = {};

const NavigationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSearchBlogArticlesQuery(searchTerm);

  const blogArticles = data?.data;

  return (
    <div className="dropdown relative hidden lg:block">
      <div className="relative">
        <SearchIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-accent" />
        <input
          type="text"
          placeholder="Suchbegriff eingeben"
          className="input input-md input-bordered w-full max-w-xs pl-8"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className={clsx(
          "dropdown-content z-[1] menu bg-base-100 absolute top-full right-0 w-[300%] border border-b overflow-y-auto p-0 rounded-lg",
          !blogArticles?.length && "hidden"
        )}
      >
        {blogArticles &&
          !!blogArticles?.length &&
          blogArticles.map(
            (
              {
                attributes: {
                  category,
                  title,
                  slug,
                  previewImage,
                  introductionText,
                },
              },
              index
            ) => (
              <Link
                tabIndex={index}
                key={title}
                href={`/kategorien/${category.data.attributes.slug}/${slug}`}
                className={clsx(
                  "flex items-center gap-4 p-4 hover:bg-primary hover:bg-opacity-10 focus:bg-primary focus:bg-opacity-10 trasition-colors duration-300 group",
                  index !== 0 && "border-t border-border"
                )}
              >
                <div>
                  <figure className="w-40 h-24 overflow-hidden relative block rounded-lg">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                      alt={previewImage?.data?.attributes?.alternativeText}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </figure>
                </div>
                <div>
                  <span className="text-base font-bold">{title}</span>
                  <div className="line-clamp-2">
                    {introductionText && (
                      <Text content={introductionText}></Text>
                    )}
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
    </div>
  );
};

export const Navigation: React.FC<NavigationProps> = () => {
  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-white border-b border-border">
            <Container className="flex justify-between items-center w-full !p-0">
              <div className="flex justify-between w-full lg:w-auto">
                <Link href="/">
                  <Logo className="w-64" />
                </Link>
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="lg:flex hidden items-center">
                <ul className="flex gap-4 nav-links">
                  <li>
                    <Link href="/">Startseite</Link>
                  </li>
                  <li>
                    <Link href="/kategorien">Kategorien</Link>
                  </li>
                  <li>
                    <Link href="#">Letzter Beitrag</Link>
                  </li>
                  <li>
                    <Link href="/kategorien/wohnen">Wohnen</Link>
                  </li>
                </ul>
              </div>
              <NavigationSearch />
            </Container>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200">
            {/* TODO: Add responsiveness to mobile menu */}
            <NavigationSearch />
          </div>
        </div>
      </div>

      {/* <nav className="drawer lg:drawer-open border-b border-border h-20 flex justify-center items-center fixed w-full top-0 bg-white z-50">
        <Container className="flex justify-between items-center w-full">
          <Link href="/">
            <Logo className="w-64" />
          </Link>
          <ul className="flex gap-4 nav-links">
            <li>
              <Link href="/">Startseite</Link>
            </li>
            <li>
              <Link href="/kategorien">Kategorien</Link>
            </li>
            <li>
              <Link href="#">Letzter Beitrag</Link>
            </li>
            <li>
              <Link href="/kategorien/wohnen">Wohnen</Link>
            </li>
          </ul>

          <div className="dropdown relative">
            <div className="relative">
              <SearchIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-accent" />
              <input
                type="text"
                placeholder="Suchbegriff eingeben"
                className="input input-md input-bordered w-full max-w-xs pl-8"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div
              className={clsx(
                "dropdown-content z-[1] menu bg-base-100 absolute top-full right-0 w-[300%] border border-b overflow-y-auto p-0 rounded-lg",
                !blogArticles?.length && "hidden"
              )}
            >
              {blogArticles &&
                !!blogArticles?.length &&
                blogArticles.map(
                  (
                    {
                      attributes: {
                        category,
                        title,
                        slug,
                        previewImage,
                        introductionText,
                      },
                    },
                    index
                  ) => (
                    <Link
                      tabIndex={index}
                      key={title}
                      href={`/kategorien/${category.data.attributes.slug}/${slug}`}
                      className={clsx(
                        "flex items-center gap-4 p-4 hover:bg-primary hover:bg-opacity-10 focus:bg-primary focus:bg-opacity-10 trasition-colors duration-300 group",
                        index !== 0 && "border-t border-border"
                      )}
                    >
                      <div>
                        <figure className="w-40 h-24 overflow-hidden relative block rounded-lg">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${previewImage?.data?.attributes?.url}`}
                            alt={
                              previewImage?.data?.attributes?.alternativeText
                            }
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        </figure>
                      </div>
                      <div>
                        <span className="text-base font-bold">{title}</span>
                        <div className="line-clamp-2">
                          {introductionText && (
                            <Text content={introductionText}></Text>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                )}
            </div>
          </div>
        </Container>
      </nav> */}
    </>
  );
};
