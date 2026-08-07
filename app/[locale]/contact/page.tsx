import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactSidebar from "@/components/contact/ContactSidebar";

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    tour?: string;
  }>;
};

export default async function ContactPage({
  params,
  searchParams,
}: ContactPageProps) {
  const { locale } = await params;
  const { tour: selectedSlug } = await searchParams;

  return (
    <>
      <Header />

      <main className="bg-gray-50">
        <ContactHero />

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[2fr_1fr] lg:px-8">
          <ContactForm
            selectedSlug={selectedSlug}
            locale={locale}
          />

          <ContactSidebar locale={locale} />
        </section>
      </main>

      <Footer />
    </>
  );
}