import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { getTourBySlug } from "@/lib/services/tour-service";

type TourPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const tour = await getTourBySlug(slug, locale);

  if (!tour) {
    return {
      title:
        locale === "es"
          ? "Tour no encontrado | Proyecta Tu Viaje"
          : "Tour Not Found | Proyecta Tu Viaje",
    };
  }

  return {
    title:
      locale === "es"
        ? `${tour.title} en La Fortuna | Proyecta Tu Viaje`
        : `${tour.title} in La Fortuna | Proyecta Tu Viaje`,
    description: tour.shortDescription,
  };
}

export default async function TourPage({
  params,
}: TourPageProps) {
  const { locale, slug } = await params;

  const tour = await getTourBySlug(slug, locale);

  if (!tour) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "TourDetail",
  });

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Imagen principal */}
        <section className="relative h-[420px] w-full sm:h-[520px]">
          <Image
            src={tour.image}
            alt={`${tour.title} - La Fortuna, Costa Rica`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8">
              <p className="font-semibold uppercase tracking-widest text-green-200">
                {tour.category} · {tour.location}
              </p>

              <h1 className="mt-3 max-w-4xl text-4xl font-bold text-white sm:text-6xl">
                {tour.title}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-100">
                {tour.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Información principal */}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr] lg:px-8">
          <div>
            <Link
              href="/#tours"
              className="font-semibold text-green-700 hover:text-green-900"
            >
              ← {t("back")}
            </Link>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                label={t("duration")}
                value={tour.duration}
              />

              <InfoCard
                label={t("difficulty")}
                value={tour.difficulty}
              />

              <InfoCard
                label={t("languages")}
                value={tour.languages.join(" / ")}
              />

              <InfoCard
                label={t("rating")}
                value={`⭐ ${tour.rating} (${tour.reviews})`}
              />
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                {t("about")}
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {tour.description}
              </p>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("includes")}
                </h2>

                {tour.includes.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {tour.includes.map((item: string, index: number) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex gap-3 text-gray-700"
                      >
                        <span className="font-bold text-green-700">
                          ✓
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-gray-600">
                    {t("noInformation")}
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("whatToBring")}
                </h2>

                {tour.whatToBring.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {tour.whatToBring.map((item: string, index: number) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex gap-3 text-gray-700"
                      >
                        <span className="font-bold text-green-700">
                          ✓
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-gray-600">
                    {t("noInformation")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Caja de reservación */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-7 shadow-lg lg:sticky lg:top-8">
            <p className="text-sm text-gray-500">
              {t("priceAdult")}
            </p>

            <p className="mt-1 text-4xl font-bold text-green-800">
              {t("from")} ${tour.priceAdult}
            </p>

            {tour.priceChild !== null &&
              tour.priceChild !== undefined && (
                <p className="mt-2 text-gray-600">
                  {t("childrenFrom")} ${tour.priceChild}
                </p>
              )}

            <div className="my-6 border-t border-gray-200" />

            <p className="leading-7 text-gray-600">
              {t("reservationInfo")}
            </p>

            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <ul className="space-y-2 text-sm leading-6 text-green-900">
                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>{t("noAdvancePayment")}</span>
                </li>

                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>{t("directPayment")}</span>
                </li>

                <li className="flex gap-2">
                  <span className="font-bold">✓</span>
                  <span>{t("freeCancellation")}</span>
                </li>
              </ul>
            </div>

            <Link
              href={`/contact?tour=${tour.slug}`}
              className="mt-6 block rounded-xl bg-green-700 px-6 py-4 text-center font-semibold text-white transition hover:bg-green-800"
            >
              {t("requestReservation")}
            </Link>

            <Link
              href="/contact"
              className="mt-3 block rounded-xl border-2 border-green-700 px-6 py-4 text-center font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              {t("contactUs")}
            </Link>

            <p className="mt-5 text-center text-sm leading-6 text-gray-500">
              {t("paymentNotice")}
            </p>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
};

function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl bg-green-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
        {label}
      </p>

      <p className="mt-2 font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}