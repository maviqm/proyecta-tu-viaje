import { getTranslations } from "next-intl/server";

import Header from "@/components/Header";
import { Link } from "@/i18n/navigation";

type ThankYouPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ThankYouPage({
  params,
}: ThankYouPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "ThankYou",
  });

  return (
    <>
      <Header />

      <main className="flex min-h-[70vh] items-center justify-center bg-green-50 px-6 py-20">
        <section className="w-full max-w-2xl rounded-3xl bg-white p-10 text-center shadow-lg">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            {t("title")}
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {t("description")}
          </p>

          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-left">
            <h2 className="font-bold text-green-900">
              {t("importantTitle")}
            </h2>

            <ul className="mt-4 space-y-3 text-gray-700">
              <li>✓ {t("point1")}</li>
              <li>✓ {t("point2")}</li>
              <li>✓ {t("point3")}</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/#tours"
              className="rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800"
            >
              {t("viewTours")}
            </Link>

            <Link
              href="/"
              className="rounded-xl border-2 border-green-700 px-6 py-4 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              {t("home")}
            </Link>

          </div>

        </section>
      </main>
    </>
  );
}