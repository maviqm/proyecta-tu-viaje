import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getFeaturedTestimonials } from "@/lib/services/testimonial-service";

type TestimonialsProps = {
  locale: string;
};

function renderStars(rating: number) {
  const roundedRating = Math.round(rating);
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

export default async function Testimonials({
  locale,
}: TestimonialsProps) {
  const t = await getTranslations({
    locale,
    namespace: "Testimonials",
  });

  const testimonials = await getFeaturedTestimonials(locale);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="bg-white px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            {t("eyebrow")}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            {t("title")}
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-7 shadow-sm"
            >
              <div
                className="text-lg tracking-wider text-yellow-500"
                aria-label={`${testimonial.rating} ${t("outOfFive")}`}
              >
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="mt-5 flex-1 text-lg leading-8 text-gray-700">
                “{testimonial.comment}”
              </blockquote>

              <div className="mt-7 border-t border-gray-200 pt-5">
                <p className="font-bold text-gray-900">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {testimonial.country}
                </p>

                {testimonial.tourSlug ? (
                  <Link
                    href={`/tours/${testimonial.tourSlug}`}
                    className="mt-3 inline-block font-semibold text-green-700 hover:text-green-900"
                  >
                    {testimonial.tour}
                  </Link>
                ) : (
                  <p className="mt-3 font-semibold text-green-700">
                    {testimonial.tour}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}