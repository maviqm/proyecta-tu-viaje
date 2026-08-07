import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type TourCardProps = {
  title: string;
  slug: string;
  shortDescription: string;
  duration: string;
  priceAdult: number;
  rating: number;
  reviews: number;
  image: string;
};

export default function TourCard({
  title,
  slug,
  shortDescription,
  duration,
  priceAdult,
  rating,
  reviews,
  image,
}: TourCardProps) {
  const t = useTranslations("TourCard");

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* DURATION */}
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          {duration}
        </p>

        {/* TITLE */}
        <h3 className="mt-2 text-2xl font-bold text-gray-900">
          {title}
        </h3>

        {/* SHORT DESCRIPTION */}
        <p className="mt-3 min-h-20 leading-7 text-gray-600">
          {shortDescription}
        </p>

        {/* RATING / PRICE / BUTTON */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              ⭐ {rating} · {reviews} {t("reviews")}
            </p>

            <p className="mt-1 font-bold text-green-800">
              {t("from")} ${priceAdult}
            </p>
          </div>

          <Link
            href={`/tours/${slug}`}
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            {t("viewTour")}
          </Link>
        </div>
      </div>
    </article>
  );
}