import { useTranslations } from "next-intl";

export default function LocationMap() {
  const t = useTranslations("LocationMap");
  return (
    <section id="location" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              {t("subtitle")}
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              {t("title")}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("description1")}
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {t("description2")}
            </p>

            <div className="mt-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
              <p className="font-bold text-gray-900">
                {t("location")}
              </p>

              <p className="mt-2 text-gray-600">
                La Fortuna, San Carlos, Alajuela, Costa Rica
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
            <iframe
              title={t("mapTitle")}
              src="https://www.google.com/maps?q=La%20Fortuna%2C%20Costa%20Rica&output=embed"
              width="100%"
              height="480"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}