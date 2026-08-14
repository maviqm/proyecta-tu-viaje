import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("Contact");

  return (
    <section className="overflow-hidden bg-green-800 py-12 text-white sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="break-words text-xs font-semibold uppercase tracking-widest text-green-200 sm:text-sm">
          {t("hero.subtitle")}
        </p>

        <h1 className="mt-3 max-w-4xl break-words text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">
          {t("hero.title")}
        </h1>

        <p className="mt-4 max-w-3xl break-words text-base leading-7 text-green-50 sm:mt-5 sm:text-lg sm:leading-8">
          {t("hero.description")}
        </p>
      </div>
    </section>
  );
}