import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("About");

  const values = [
    {
      title: t("value1Title"),
      description: t("value1Description"),
    },
    {
      title: t("value2Title"),
      description: t("value2Description"),
    },
    {
      title: t("value3Title"),
      description: t("value3Description"),
    },
  ];

  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              {t("subtitle")}
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              {t("title")}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("paragraph1")}
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {t("paragraph2")}
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {t("paragraph3")}
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-xl bg-green-700 px-7 py-4 font-semibold text-white transition hover:bg-green-800"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="rounded-3xl bg-green-50 p-7 shadow-sm sm:p-10">
            <div className="rounded-2xl bg-white p-7 shadow-md">
              <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
                {t("whyChooseUs")}
              </p>

              <div className="mt-7 space-y-7">
                {values.map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                      ✓
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {value.title}
                      </h3>

                      <p className="mt-2 leading-7 text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-green-800 p-7 text-white">
              <p className="text-xl font-bold">
                {t("bottomTitle")}
              </p>

              <p className="mt-3 leading-7 text-green-50">
                {t("bottomDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}