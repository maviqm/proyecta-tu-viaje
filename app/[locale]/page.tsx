import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import FeaturedTours from "@/components/home/FeaturedTours";
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import FAQ from "@/components/home/FAQ";
import Testimonials from "@/components/home/Testimonials";
import LocationMap from "@/components/home/LocationMap";

import { getFeaturedTours } from "@/lib/services/tour-service";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale } = await params;

  const tours = await getFeaturedTours(locale);

  return (
    <>
      <Header />

      <main>
        <Hero />

        <FeaturedTours tours={tours} />

        <AboutUs />

        <Testimonials locale={locale} />

        <FAQ />

        <LocationMap />
      </main>

      <Footer />
    </>
  );
}