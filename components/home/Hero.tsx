import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CalendarCheck, HandCoins, ShieldCheck } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section className="bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-8 py-28">

        <p className="text-green-700 font-semibold uppercase tracking-widest">
          {t("welcome")}
        </p>

        <h1 className="mt-4 text-6xl font-bold text-gray-900 leading-tight">
          {t("title")}
          <br />
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-gray-600 leading-8">
          {t("description")}
        </p>

            <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/#tours"
          className="rounded-xl bg-green-700 px-7 py-4 font-semibold text-white transition hover:bg-green-800"
        >
          {t("exploreTours")}
        </Link>

        <Link
          href="/contact"
          className="rounded-xl border-2 border-green-700 px-7 py-4 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
        >
          {t("contactUs")}
        </Link>
      </div>
<div className="mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
  <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
      <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {t("benefits.noAdvancePaymentTitle")}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {t("benefits.noAdvancePaymentDescription")}
        </p>
      </div>

      <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <HandCoins className="h-6 w-6" aria-hidden="true" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {t("benefits.directPaymentTitle")}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {t("benefits.directPaymentDescription")}
        </p>
      </div>

      <div className="group rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <CalendarCheck className="h-6 w-6" aria-hidden="true" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {t("benefits.freeCancellationTitle")}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {t("benefits.freeCancellationDescription")}
        </p>
      </div>
    </div>
      </div>
      
    </section>
  );
}