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
    <section
      id="about"
      className="overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* MAIN CONTENT */}
          <div className="min-w-0">
            <p className="break-words text-xs font-semibold uppercase tracking-widest text-green-700 sm:text-sm">
              {t("subtitle")}
            </p>

            <h2 className="mt-4 max-w-2xl break-words text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>

            <div className="mt-6 max-w-2xl space-y-4 sm:space-y-5">
              <p className="break-words text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                {t("paragraph1")}
              </p>

              <p className="break-words text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                {t("paragraph2")}
              </p>

              <p className="break-words text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                {t("paragraph3")}
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-6 py-4 text-center font-semibold text-white transition hover:bg-green-800 sm:w-auto sm:px-7"
            >
              {t("contact")}
            </Link>
          </div>

          {/* VALUES */}
          <div className="min-w-0 rounded-3xl bg-green-50 p-4 shadow-sm sm:p-7 lg:p-10">
            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-md sm:p-7">
              <p className="break-words text-xs font-semibold uppercase tracking-widest text-green-700 sm:text-sm">
                {t("whyChooseUs")}
              </p>

              <div className="mt-6 space-y-6 sm:mt-7 sm:space-y-7">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="flex min-w-0 items-start gap-3 sm:gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800 sm:h-11 sm:w-11">
                      ✓
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-base font-bold leading-snug text-gray-900 sm:text-lg">
                        {value.title}
                      </h3>

                      <p className="mt-2 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM MESSAGE */}
            <div className="mt-4 min-w-0 rounded-2xl bg-green-800 p-5 text-white sm:mt-6 sm:p-7">
              <p className="break-words text-lg font-bold leading-snug sm:text-xl">
                {t("bottomTitle")}
              </p>

              <p className="mt-3 break-words text-sm leading-6 text-green-50 sm:text-base sm:leading-7">
                {t("bottomDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}