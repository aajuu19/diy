import { Container, Headline } from "@/components/common";
import { NewestBlogArticles } from "@/components/sections/NewestBlogArticles";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <Container className="border-b border-border pb-6">
          <Headline as="h1" variant="h1">
            Willkommen bei EASY-DIY – Ihr Ratgeber für kreative DIY-Projekte
          </Headline>
          <p>
            Tauchen Sie in die inspirierende Welt des DIY ein mit EASY-DIY.
            Erfahren Sie alles über Selbstgestaltung, kreative Heimprojekte und
            praktische Tipps, um Ihre Umgebung individuell zu gestalten.
          </p>
          <Link href="/letzter-beitrag" className="btn btn-primary">
            Zum letzten Beitrag
          </Link>
        </Container>
      </section>

      <NewestBlogArticles />
    </>
  );
}
