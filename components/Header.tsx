"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
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
      ? "rounded-full bg-green-700 px-4 py-2 text-white"
      : "rounded-full px-4 py-2 text-gray-700 transition hover:bg-gray-100";

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Proyecta Tu Viaje">
          <Image
            src="/images/logo/logo-horizontal.png"
            alt="Proyecta Tu Viaje"
            width={220}
            height={70}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-gray-800 transition hover:text-green-700"
          >
            {t("home")}
          </Link>

          <Link
            href="/#tours"
            className="text-gray-800 transition hover:text-green-700"
          >
            {t("tours")}
          </Link>

          <Link
            href="/#about"
            className="text-gray-800 transition hover:text-green-700"
          >
            {t("about")}
          </Link>

          <Link
            href="/#faq"
            className="text-gray-800 transition hover:text-green-700"
          >
            {t("faq")}
          </Link>

          <Link
            href="/contact"
            className="text-gray-800 transition hover:text-green-700"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div
            className="flex rounded-full border"
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
            className="rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800"
          >
            {t("bookNow")}
          </Link>
        </div>

        <button
          type="button"
          className="text-2xl lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="border-t bg-white lg:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              {t("home")}
            </Link>

            <Link href="/#tours" onClick={() => setMenuOpen(false)}>
              {t("tours")}
            </Link>

            <Link href="/#about" onClick={() => setMenuOpen(false)}>
              {t("about")}
            </Link>

            <Link href="/#faq" onClick={() => setMenuOpen(false)}>
              {t("faq")}
            </Link>

            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              {t("contact")}
            </Link>

            <div className="flex w-fit rounded-full border">
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
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-green-700 py-3 text-center text-white"
            >
              {t("bookNow")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}