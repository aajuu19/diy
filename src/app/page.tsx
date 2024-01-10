import { Container } from "@/components/common";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <Container>
        <p>Hey, willkommen bei DIY</p>
        <p>
          <Link href="kategorien">Kategorien</Link>
        </p>
      </Container>
    </section>
  );
}
