import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { siteConfig } from "../../data/site";

export default function Footer() {
  const t = useTranslations("Footer");

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold">{siteConfig.name}</h2>

          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-green-400">
            {siteConfig.slogan}
          </p>

          <p className="mt-5 max-w-sm leading-7 text-gray-300">
            {t("description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">{t("explore")}</h2>

          <nav className="mt-5 flex flex-col gap-3 text-gray-300">
            <Link
              href="/"
              className="transition hover:text-green-400"
            >
              {t("home")}
            </Link>

            <Link
              href="/#tours"
              className="transition hover:text-green-400"
            >
              {t("tours")}
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-green-400"
            >
              {t("contact")}
            </Link>

            <Link
              href="/thank-you"
              className="transition hover:text-green-400"
            >
              {t("reservationProcess")}
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-lg font-bold">
            {t("contactTitle")}
          </h2>

          <div className="mt-5 space-y-4 text-gray-300">
            <p>{siteConfig.location}</p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="block break-words transition hover:text-green-400"
            >
              {siteConfig.email}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="block transition hover:text-green-400"
            >
              WhatsApp: {siteConfig.phone}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold">
            {t("reservationInfo")}
          </h2>

          <p className="mt-5 leading-7 text-gray-300">
            {t("reservationDescription")}
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            {t("requestReservation")}
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {t("rightsReserved")}
          </p>

          <p>La Fortuna, Costa Rica</p>
        </div>
      </div>
    </footer>
  );
}