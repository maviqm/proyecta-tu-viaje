import TourCard from "../tours/TourCard";
import type { Tour } from "@/lib/types/tour";
import { useTranslations } from "next-intl";

type FeaturedToursProps = {
  tours: Tour[];
};

export default function FeaturedTours({
  tours,
}: FeaturedToursProps) {
  const t = useTranslations("FeaturedTours");

  return (
    <section
      id="tours"
      className="overflow-hidden bg-gray-50 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="mx-auto mb-8 max-w-3xl min-w-0 text-center sm:mb-10 lg:mb-12">
          <p className="break-words text-xs font-semibold uppercase tracking-widest text-green-700 sm:text-sm">
            {t("subtitle")}
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-4 break-words text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>

        {/* TOURS */}
        {tours.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-10">
            <h3 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
              {t("emptyTitle")}
            </h3>

            <p className="mt-3 break-words text-sm leading-6 text-gray-600 sm:text-base">
              {t("emptyDescription")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                title={tour.title}
                slug={tour.slug}
                shortDescription={tour.shortDescription}
                duration={tour.duration}
                priceAdult={tour.priceAdult}
                rating={tour.rating}
                reviews={tour.reviews}
                image={tour.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}