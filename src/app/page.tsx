import { Container, Headline, Text } from "@/components/common";
import { NewestBlogArticles } from "@/components/sections/NewestBlogArticles";
import { TabSection } from "@/components/sections/TabSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <Container className="border-b border-border pb-14">
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

      <TabSection />

      <section className="mt-14">
        <Container className="border-b border-border pb-14">
          <Headline as="h2" variant="h2">
            Meistern Sie DIY: Von Heimwerken bis Raumgestaltung
          </Headline>
          <p>
            EASY-DIY bringt die Freude am Selbstmachen zu Ihnen nach Hause.
            Unsere umfangreichen Anleitungen und Tipps im Bereich DIY helfen
            Ihnen, Ihre handwerklichen Fähigkeiten zu erweitern und Ihr Zuhause
            individuell zu gestalten. Von Heimdekoration bis zu Gartenprojekten
            – entdecken Sie die Vielfalt des Selbermachens!
          </p>
        </Container>
      </section>

      <section className="mt-14">
        <div className="hero">
          <Container className="pb-14">
            <div className="hero-content flex-col lg:flex-row p-0 grid grid-cols-12">
              <div className="relative col-span-5 h-full">
                <Image
                  src="/landing/diy-content.jpg"
                  fill
                  alt="Farbenfrohes Bild mit einigen DIY Utensilien"
                  className="object-cover h-full w-full rounded-lg"
                />
              </div>
              <div className="col-span-8 col-start-7 py-12 flex flex-col gap-6">
                <Headline as="h3" variant="h3">
                  Selbstgestaltung leicht gemacht: Ihre DIY-Projektzentrale
                </Headline>
                <p>
                  Machen Sie Ihr Zuhause zu einem Spiegel Ihrer Kreativität mit
                  unseren DIY-Anleitungen. Wir bieten Ihnen die neuesten Trends
                  und nachhaltige Lösungen, um Ihre Ideen für Selbstgestaltung
                  zu verwirklichen. Ob es um das Umgestalten alter Möbel geht
                  oder um die Schaffung neuer Deko-Elemente, bei EASY-DIY finden
                  Sie Inspiration und Know-how.
                </p>
                <button className="btn btn-primary">
                  Sehen Sie sich alle DIY-Kategorien an
                </button>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
