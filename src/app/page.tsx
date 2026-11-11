import { Experience } from "@/components/sections/Experience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <FinalCta />
      <LocalBusinessJsonLd />
    </>
  );
}
