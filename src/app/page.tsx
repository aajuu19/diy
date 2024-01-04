import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p>Hey, willkommen bei DIY</p>
      <p>
        <Link href="kategorien">Kategorien</Link>
      </p>
    </main>
  );
}
