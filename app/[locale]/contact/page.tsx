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

      <main className="overflow-hidden bg-gray-50">
        <ContactHero />

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-10 lg:px-8 lg:py-16">
          <div className="min-w-0">
            <ContactForm
              selectedSlug={selectedSlug}
              locale={locale}
            />
          </div>

          <div className="min-w-0">
            <ContactSidebar locale={locale} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}