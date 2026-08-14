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
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-52 w-full shrink-0 sm:h-56 lg:h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 min-w-0 flex-col p-4 sm:p-5 lg:p-6">
        {/* DURATION */}
        <p className="break-words text-xs font-semibold uppercase tracking-wide text-green-700 sm:text-sm">
          {duration}
        </p>

        {/* TITLE */}
        <h3 className="mt-2 break-words text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
          {title}
        </h3>

        {/* SHORT DESCRIPTION */}
        <p className="mt-3 flex-1 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
          {shortDescription}
        </p>

        {/* RATING / PRICE / BUTTON */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="break-words text-sm text-gray-500">
              ⭐ {rating} · {reviews} {t("reviews")}
            </p>

            <p className="mt-1 break-words font-bold text-green-800">
              {t("from")} ${priceAdult}
            </p>
          </div>

          <Link
            href={`/tours/${slug}`}
            className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-800 sm:w-auto"
          >
            {t("viewTour")}
          </Link>
        </div>
      </div>
    </article>
  );
}