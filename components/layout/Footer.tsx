import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { siteConfig } from "../../data/site";

export default function Footer() {
  const t = useTranslations("Footer");

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <footer className="overflow-hidden bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:px-8 lg:py-14">
        {/* BRAND */}
        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold sm:text-2xl">
            {siteConfig.name}
          </h2>

          <p className="mt-2 break-words text-xs font-semibold uppercase tracking-widest text-green-400 sm:text-sm">
            {siteConfig.slogan}
          </p>

          <p className="mt-4 max-w-sm break-words text-sm leading-6 text-gray-300 sm:mt-5 sm:text-base sm:leading-7">
            {t("description")}
          </p>
        </div>

        {/* EXPLORE */}
        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold">
            {t("explore")}
          </h2>

          <nav className="mt-4 flex flex-col gap-3 text-sm text-gray-300 sm:mt-5 sm:text-base">
            <Link
              href="/"
              className="w-fit max-w-full break-words transition hover:text-green-400"
            >
              {t("home")}
            </Link>

            <Link
              href="/#tours"
              className="w-fit max-w-full break-words transition hover:text-green-400"
            >
              {t("tours")}
            </Link>

            <Link
              href="/contact"
              className="w-fit max-w-full break-words transition hover:text-green-400"
            >
              {t("contact")}
            </Link>

            <Link
              href="/thank-you"
              className="w-fit max-w-full break-words transition hover:text-green-400"
            >
              {t("reservationProcess")}
            </Link>
          </nav>
        </div>

        {/* CONTACT */}
        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold">
            {t("contactTitle")}
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-6 text-gray-300 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-7">
            <p className="break-words">
              {siteConfig.location}
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="block break-all transition hover:text-green-400 sm:break-words"
            >
              {siteConfig.email}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="block break-words transition hover:text-green-400"
            >
              WhatsApp: {siteConfig.phone}
            </a>
          </div>
        </div>

        {/* RESERVATION */}
        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold">
            {t("reservationInfo")}
          </h2>

          <p className="mt-4 break-words text-sm leading-6 text-gray-300 sm:mt-5 sm:text-base sm:leading-7">
            {t("reservationDescription")}
          </p>

          <Link
            href="/contact"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-600 sm:mt-6 sm:w-auto sm:px-6"
          >
            {t("requestReservation")}
          </Link>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm leading-6 text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-6 lg:px-8">
          <p className="break-words">
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {t("rightsReserved")}
          </p>

          <p className="break-words">
            La Fortuna, Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}