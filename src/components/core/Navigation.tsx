"use client";

import Link from "next/link";
import { Container } from "../common";
import { SearchIcon } from "../icons";
import { useSearchBlogArticlesQuery } from "@/data/useSearchBlogArticlesQuery";
import { useState } from "react";
import clsx from "clsx";
import { Logo } from "../icons/Logo";

type NavigationProps = {};

export const Navigation: React.FC<NavigationProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSearchBlogArticlesQuery(searchTerm);

  const blogArticles = data?.data;

  console.log(!!blogArticles?.length);

  return (
    <nav className="border-b border-border h-20 flex justify-center items-center fixed w-full top-0 z-10 bg-white">
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

        <div className="dropdown">
          <div className="relative">
            <SearchIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-accent" />
            <input
              type="text"
              placeholder="Suchbegriff eingeben"
              className="input input-md input-bordered w-full max-w-xs rounded-none pl-8"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ul
            tabIndex={0}
            className={clsx(
              "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52",
              !blogArticles?.length && "hidden"
            )}
          >
            {blogArticles &&
              !!blogArticles?.length &&
              blogArticles.map((article) => (
                <li key={article?.attributes?.title}>
                  {article.attributes.title}
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
};
