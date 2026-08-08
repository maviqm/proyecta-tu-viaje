import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  hasLocale,
  NextIntlClientProvider,
} from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://proyecta-tu-viaje.vercel.app";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  const isSpanish = locale === "es";

  const title = isSpanish
    ? "Proyecta Tu Viaje | Tours en Costa Rica"
    : "Proyecta Tu Viaje | Costa Rica Tours";

  const description = isSpanish
    ? "Tours personalizados y experiencias inolvidables en La Fortuna, Costa Rica."
    : "Personalized tours and unforgettable experiences in La Fortuna, Costa Rica.";

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: title,
      template: "%s | Proyecta Tu Viaje",
    },

    description,

    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },

    openGraph: {
      type: "website",
      locale: isSpanish ? "es_CR" : "en_US",
      alternateLocale: isSpanish ? ["en_US"] : ["es_CR"],
      url: `/${locale}`,
      siteName: "Proyecta Tu Viaje",
      title,
      description,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className="h-full scroll-smooth"
    >
      <body
        className={`${poppins.className} min-h-screen bg-white text-gray-900`}
      >
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}