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
    <aside className="space-y-6">
      <div className="rounded-2xl bg-white p-7 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("directContactTitle")}
        </h2>

        <p className="mt-3 leading-7 text-gray-600">
          {t("directContactDescription")}
        </p>

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 block rounded-xl bg-green-700 px-5 py-4 text-center font-semibold text-white transition hover:bg-green-800"
        >
          {t("whatsapp")}
        </a>

        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 block rounded-xl border-2 border-green-700 px-5 py-4 text-center font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
        >
          {t("email")}
        </a>
      </div>

      <div className="rounded-2xl bg-green-50 p-7">
        <h2 className="text-xl font-bold text-gray-900">
          {t("howItWorksTitle")}
        </h2>

        <ol className="mt-5 space-y-4 text-gray-700">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
          <li>{t("step4")}</li>
        </ol>
      </div>

      <div className="rounded-2xl border border-green-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          {t("importantTitle")}
        </h2>

        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
          <li className="flex gap-2">
            <span className="font-bold text-green-700">✓</span>
            <span>{t("noAdvancePayment")}</span>
          </li>

          <li className="flex gap-2">
            <span className="font-bold text-green-700">✓</span>
            <span>{t("directPayment")}</span>
          </li>

          <li className="flex gap-2">
            <span className="font-bold text-green-700">✓</span>
            <span>{t("freeCancellation")}</span>
          </li>
        </ul>
      </div>

      <Link
        href="/#tours"
        className="block text-center font-semibold text-green-700 hover:text-green-900"
      >
        ← {t("back")}
      </Link>
    </aside>
  );
}