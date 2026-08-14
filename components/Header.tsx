"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useTransition } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Header");
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  function changeLanguage(nextLocale: "en" | "es") {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale,
      });
    });

    setMenuOpen(false);
  }

  const languageButtonClass = (buttonLocale: "en" | "es") =>
    buttonLocale === locale
      ? "rounded-full bg-green-700 px-4 py-2 text-sm font-medium text-white"
      : "rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100";

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Proyecta Tu Viaje"
          className="min-w-0 shrink"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/logo/logo-horizontal.png"
            alt="Proyecta Tu Viaje"
            width={220}
            height={70}
            priority
            className="h-auto w-[160px] sm:w-[190px] lg:w-[220px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          <Link
            href="/"
            className="whitespace-nowrap text-sm text-gray-800 transition hover:text-green-700 xl:text-base"
          >
            {t("home")}
          </Link>

          <Link
            href="/#tours"
            className="whitespace-nowrap text-sm text-gray-800 transition hover:text-green-700 xl:text-base"
          >
            {t("tours")}
          </Link>

          <Link
            href="/#about"
            className="whitespace-nowrap text-sm text-gray-800 transition hover:text-green-700 xl:text-base"
          >
            {t("about")}
          </Link>

          <Link
            href="/#faq"
            className="whitespace-nowrap text-sm text-gray-800 transition hover:text-green-700 xl:text-base"
          >
            {t("faq")}
          </Link>

          <Link
            href="/contact"
            className="whitespace-nowrap text-sm text-gray-800 transition hover:text-green-700 xl:text-base"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          <div
            className="flex shrink-0 rounded-full border"
            aria-label="Language selector"
          >
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              disabled={isPending}
              className={languageButtonClass("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => changeLanguage("es")}
              disabled={isPending}
              className={languageButtonClass("es")}
              aria-pressed={locale === "es"}
            >
              ES
            </button>
          </div>

          <Link
            href="/contact"
            className="shrink-0 whitespace-nowrap rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 xl:px-5 xl:text-base"
          >
            {t("bookNow")}
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-2xl text-gray-800 transition hover:bg-gray-100 lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="border-t bg-white shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-gray-800 transition hover:bg-gray-50 hover:text-green-700"
            >
              {t("home")}
            </Link>

            <Link
              href="/#tours"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-gray-800 transition hover:bg-gray-50 hover:text-green-700"
            >
              {t("tours")}
            </Link>

            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-gray-800 transition hover:bg-gray-50 hover:text-green-700"
            >
              {t("about")}
            </Link>

            <Link
              href="/#faq"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-gray-800 transition hover:bg-gray-50 hover:text-green-700"
            >
              {t("faq")}
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-gray-800 transition hover:bg-gray-50 hover:text-green-700"
            >
              {t("contact")}
            </Link>

            <div className="mt-3 border-t pt-4">
              <div className="flex items-center justify-between gap-4">
                <div
                  className="flex w-fit shrink-0 rounded-full border"
                  aria-label="Language selector"
                >
                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    disabled={isPending}
                    className={languageButtonClass("en")}
                    aria-pressed={locale === "en"}
                  >
                    EN
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage("es")}
                    disabled={isPending}
                    className={languageButtonClass("es")}
                    aria-pressed={locale === "es"}
                  >
                    ES
                  </button>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                {t("bookNow")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}