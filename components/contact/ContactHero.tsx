import { useTranslations } from "next-intl";
export default function ContactHero() {
  const t = useTranslations("Contact");

  return (
    <section className="bg-green-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="font-semibold uppercase tracking-widest text-green-200">
          {t("hero.subtitle")}
        </p>

        <h1 className="mt-3 text-4xl font-bold sm:text-6xl">
          {t("hero.title")}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-green-50">
          {t("hero.description")}
        </p>
      </div>
    </section>
  );
}