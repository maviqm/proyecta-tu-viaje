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

      <main className="overflow-hidden bg-white">
        {/* HERO IMAGE */}
        <section className="relative min-h-[440px] w-full sm:min-h-[500px] lg:min-h-[560px]">
          <Image
            src={tour.image}
            alt={`${tour.title} - La Fortuna, Costa Rica`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex min-h-[440px] items-end sm:min-h-[500px] lg:min-h-[560px]">
            <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 sm:pb-10 lg:px-8 lg:pb-14">
              <p className="max-w-3xl break-words text-xs font-semibold uppercase tracking-widest text-green-200 sm:text-sm">
                {tour.category} · {tour.location}
              </p>

              <h1 className="mt-3 max-w-4xl break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
                {tour.title}
              </h1>

              <p className="mt-4 max-w-2xl break-words text-base leading-7 text-gray-100 sm:text-lg sm:leading-8">
                {tour.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* MAIN INFORMATION */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-12 lg:px-8 lg:py-16">
          {/* TOUR CONTENT */}
          <div className="min-w-0">
            <Link
              href="/#tours"
              className="inline-flex max-w-full items-center break-words font-semibold text-green-700 transition hover:text-green-900"
            >
              ← {t("back")}
            </Link>

            {/* INFO CARDS */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

            {/* DESCRIPTION */}
            <div className="mt-10 min-w-0 sm:mt-12">
              <h2 className="break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {t("about")}
              </h2>

              <p className="mt-4 break-words text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
                {tour.description}
              </p>
            </div>

            {/* INCLUDES / WHAT TO BRING */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2 md:gap-10">
              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                  {t("includes")}
                </h2>

                {tour.includes.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {tour.includes.map((item: string, index: number) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex min-w-0 items-start gap-3 text-sm leading-6 text-gray-700 sm:text-base sm:leading-7"
                      >
                        <span className="shrink-0 font-bold text-green-700">
                          ✓
                        </span>

                        <span className="min-w-0 flex-1 break-words">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 break-words text-gray-600">
                    {t("noInformation")}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                  {t("whatToBring")}
                </h2>

                {tour.whatToBring.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {tour.whatToBring.map((item: string, index: number) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex min-w-0 items-start gap-3 text-sm leading-6 text-gray-700 sm:text-base sm:leading-7"
                      >
                        <span className="shrink-0 font-bold text-green-700">
                          ✓
                        </span>

                        <span className="min-w-0 flex-1 break-words">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 break-words text-gray-600">
                    {t("noInformation")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RESERVATION CARD */}
          <aside className="h-fit min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-7 lg:sticky lg:top-28">
            <p className="break-words text-sm text-gray-500">
              {t("priceAdult")}
            </p>

            <p className="mt-1 break-words text-3xl font-bold leading-tight text-green-800 sm:text-4xl">
              {t("from")} ${tour.priceAdult}
            </p>

            {tour.priceChild !== null &&
              tour.priceChild !== undefined && (
                <p className="mt-2 break-words text-sm text-gray-600 sm:text-base">
                  {t("childrenFrom")} ${tour.priceChild}
                </p>
              )}

            <div className="my-6 border-t border-gray-200" />

            <p className="break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              {t("reservationInfo")}
            </p>

            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <ul className="space-y-3 text-sm leading-6 text-green-900">
                <li className="flex min-w-0 items-start gap-2">
                  <span className="shrink-0 font-bold">✓</span>
                  <span className="min-w-0 flex-1 break-words">
                    {t("noAdvancePayment")}
                  </span>
                </li>

                <li className="flex min-w-0 items-start gap-2">
                  <span className="shrink-0 font-bold">✓</span>
                  <span className="min-w-0 flex-1 break-words">
                    {t("directPayment")}
                  </span>
                </li>

                <li className="flex min-w-0 items-start gap-2">
                  <span className="shrink-0 font-bold">✓</span>
                  <span className="min-w-0 flex-1 break-words">
                    {t("freeCancellation")}
                  </span>
                </li>
              </ul>
            </div>

            <Link
              href={`/contact?tour=${tour.slug}`}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-green-700 px-5 py-4 text-center font-semibold text-white transition hover:bg-green-800 sm:px-6"
            >
              {t("requestReservation")}
            </Link>

            <Link
              href="/contact"
              className="mt-3 flex w-full items-center justify-center rounded-xl border-2 border-green-700 px-5 py-4 text-center font-semibold text-green-700 transition hover:bg-green-700 hover:text-white sm:px-6"
            >
              {t("contactUs")}
            </Link>

            <p className="mt-5 break-words text-center text-sm leading-6 text-gray-500">
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
    <div className="min-w-0 rounded-xl bg-green-50 p-4 sm:p-5">
      <p className="break-words text-xs font-semibold uppercase tracking-wide text-green-700 sm:text-sm">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold leading-6 text-gray-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}