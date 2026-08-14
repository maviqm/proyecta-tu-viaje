import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CalendarCheck, HandCoins, ShieldCheck } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="overflow-hidden bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* INTRO */}
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold uppercase tracking-widest text-green-700 sm:text-sm">
            {t("welcome")}
          </p>

          <h1 className="mt-4 max-w-4xl break-words text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl break-words text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl">
            {t("description")}
          </p>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/#tours"
              className="inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-6 py-4 text-center font-semibold text-white transition hover:bg-green-800 sm:w-auto sm:px-7"
            >
              {t("exploreTours")}
            </Link>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-green-700 px-6 py-4 text-center font-semibold text-green-700 transition hover:bg-green-700 hover:text-white sm:w-auto sm:px-7"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <div className="group min-w-0 rounded-2xl border border-green-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 sm:h-12 sm:w-12">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>

            <h2 className="mt-4 break-words text-lg font-bold leading-snug text-gray-900">
              {t("benefits.noAdvancePaymentTitle")}
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-gray-600">
              {t("benefits.noAdvancePaymentDescription")}
            </p>
          </div>

          <div className="group min-w-0 rounded-2xl border border-green-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 sm:h-12 sm:w-12">
              <HandCoins className="h-6 w-6" aria-hidden="true" />
            </div>

            <h2 className="mt-4 break-words text-lg font-bold leading-snug text-gray-900">
              {t("benefits.directPaymentTitle")}
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-gray-600">
              {t("benefits.directPaymentDescription")}
            </p>
          </div>

          <div className="group min-w-0 rounded-2xl border border-green-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 sm:p-6 lg:col-span-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 sm:h-12 sm:w-12">
              <CalendarCheck className="h-6 w-6" aria-hidden="true" />
            </div>

            <h2 className="mt-4 break-words text-lg font-bold leading-snug text-gray-900">
              {t("benefits.freeCancellationTitle")}
            </h2>

            <p className="mt-2 break-words text-sm leading-6 text-gray-600">
              {t("benefits.freeCancellationDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}