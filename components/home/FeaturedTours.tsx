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
    <section id="tours" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            {t("subtitle")}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {t("description")}
          </p>
        </div>

        {tours.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              {t("emptyTitle")}
            </h3>

            <p className="mt-3 text-gray-600">
              {t("emptyDescription")}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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