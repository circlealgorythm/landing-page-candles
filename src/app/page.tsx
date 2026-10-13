import {
  AboutSection,
  FaqSection,
  FooterSection,
  HeroSection,
  PricingSection,
  ProgramSection,
  TestimonialsSection,
  UniquenessSection
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <main className="relative flex-1 w-full max-w-full overflow-x-clip">
        <HeroSection />
        <UniquenessSection />
        <ProgramSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
