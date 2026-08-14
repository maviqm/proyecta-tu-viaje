import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";

type ContactSidebarProps = {
  locale: string;
};

export default async function ContactSidebar({
  locale,
}: ContactSidebarProps) {
  const t = await getTranslations({
    locale,
    namespace: "Contact.sidebar",
  });

  return (
    <aside className="min-w-0 space-y-5 sm:space-y-6">
      {/* DIRECT CONTACT */}
      <div className="min-w-0 rounded-2xl bg-white p-5 shadow-md sm:p-7">
        <h2 className="break-words text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
          {t("directContactTitle")}
        </h2>

        <p className="mt-3 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
          {t("directContactDescription")}
        </p>

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-green-700 px-4 py-4 text-center font-semibold text-white transition hover:bg-green-800 sm:px-5"
        >
          <span className="min-w-0 break-words">
            {t("whatsapp")}
          </span>
        </a>

        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 flex w-full items-center justify-center rounded-xl border-2 border-green-700 px-4 py-4 text-center font-semibold text-green-700 transition hover:bg-green-700 hover:text-white sm:px-5"
        >
          <span className="min-w-0 break-words">
            {t("email")}
          </span>
        </a>
      </div>

      {/* HOW IT WORKS */}
      <div className="min-w-0 rounded-2xl bg-green-50 p-5 sm:p-7">
        <h2 className="break-words text-lg font-bold leading-tight text-gray-900 sm:text-xl">
          {t("howItWorksTitle")}
        </h2>

        <ol className="mt-5 space-y-4 text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
          <li className="break-words">{t("step1")}</li>
          <li className="break-words">{t("step2")}</li>
          <li className="break-words">{t("step3")}</li>
          <li className="break-words">{t("step4")}</li>
        </ol>
      </div>

      {/* IMPORTANT INFORMATION */}
      <div className="min-w-0 rounded-2xl border border-green-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="break-words text-lg font-bold leading-tight text-gray-900 sm:text-xl">
          {t("importantTitle")}
        </h2>

        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
          <li className="flex min-w-0 items-start gap-2">
            <span className="shrink-0 font-bold text-green-700">
              ✓
            </span>

            <span className="min-w-0 flex-1 break-words">
              {t("noAdvancePayment")}
            </span>
          </li>

          <li className="flex min-w-0 items-start gap-2">
            <span className="shrink-0 font-bold text-green-700">
              ✓
            </span>

            <span className="min-w-0 flex-1 break-words">
              {t("directPayment")}
            </span>
          </li>

          <li className="flex min-w-0 items-start gap-2">
            <span className="shrink-0 font-bold text-green-700">
              ✓
            </span>

            <span className="min-w-0 flex-1 break-words">
              {t("freeCancellation")}
            </span>
          </li>
        </ul>
      </div>

      {/* BACK TO TOURS */}
      <Link
        href="/#tours"
        className="block break-words px-2 text-center font-semibold text-green-700 transition hover:text-green-900"
      >
        ← {t("back")}
      </Link>
    </aside>
  );
}