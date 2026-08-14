import FormField from "@/components/contact/FormField";
import { getTourOptions } from "@/lib/services/tour-service";
import { getTranslations } from "next-intl/server";

type ContactFormProps = {
  selectedSlug?: string;
  locale: string;
};

export default async function ContactForm({
  selectedSlug,
  locale,
}: ContactFormProps) {
  // Obtenemos los tours en el idioma actual.
  const tours = await getTourOptions(locale);

  const selectedTour = tours.find(
    (tour) => tour.slug === selectedSlug
  );

  const t = await getTranslations({
    locale,
    namespace: "Contact.form",
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.proyectatuviaje.com";

  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-md sm:p-7 lg:p-10">
      {/* HEADER */}
      <h2 className="break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
        {t("title")}
      </h2>

      <p className="mt-3 break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
        {t("description")}
      </p>

      {/* TRUST BOX */}
      <div className="mt-6 min-w-0 rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5">
        <p className="break-words font-bold text-green-900">
          {t("trustTitle")}
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-6 text-green-800">
          <li className="flex min-w-0 items-start gap-2">
            <span className="shrink-0 font-bold">✓</span>
            <span className="min-w-0 flex-1 break-words">
              {t("trustNoAdvancePayment")}
            </span>
          </li>

          <li className="flex min-w-0 items-start gap-2">
            <span className="shrink-0 font-bold">✓</span>
            <span className="min-w-0 flex-1 break-words">
              {t("trustDirectPayment")}
            </span>
          </li>

          <li className="flex min-w-0 items-start gap-2">
            <span className="shrink-0 font-bold">✓</span>
            <span className="min-w-0 flex-1 break-words">
              {t("trustFreeCancellation")}
            </span>
          </li>
        </ul>
      </div>

      {/* FORM */}
      <form
        action="https://formspree.io/f/mjgngwwd"
        method="POST"
        className="mt-8 min-w-0 space-y-6"
      >
        {/* EMAIL SUBJECT */}
        <input
          type="hidden"
          name="_subject"
          value={t("emailSubject")}
        />

        {/* REDIRECT AFTER SUBMIT */}
        <input
          type="hidden"
          name="_next"
          value={`${siteUrl}/${locale}/thank-you`}
        />

        {/* NAME / EMAIL */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <FormField
            label={t("fullName")}
            name="name"
            type="text"
            placeholder={t("fullNamePlaceholder")}
          />

          <FormField
            label={t("email")}
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        {/* TOUR */}
        <div className="min-w-0">
          <label
            htmlFor="tour"
            className="block break-words font-semibold text-gray-800"
          >
            {t("tour")}
          </label>

          <select
            id="tour"
            name="tour"
            defaultValue={selectedTour?.slug ?? ""}
            className="mt-2 w-full min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200 sm:px-4 sm:text-base"
            required
          >
            <option value="" disabled>
              {t("selectExperience")}
            </option>

            {tours.map((tour) => (
              <option
                key={tour.id}
                value={tour.slug}
              >
                {tour.title}
              </option>
            ))}
          </select>

          {tours.length === 0 && (
            <p className="mt-2 break-words text-sm text-red-600">
              {t("noTours")}
            </p>
          )}
        </div>

        {/* DATE / TIME */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <FormField
            label={t("preferredDate")}
            name="date"
            type="date"
          />

          <div className="min-w-0">
            <label
              htmlFor="time"
              className="block break-words font-semibold text-gray-800"
            >
              {t("preferredTime")}
            </label>

            <select
              id="time"
              name="time"
              defaultValue=""
              className="mt-2 w-full min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200 sm:px-4 sm:text-base"
              required
            >
              <option value="" disabled>
                {t("selectTime")}
              </option>

              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
            </select>
          </div>
        </div>

        {/* PEOPLE */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <FormField
            label={t("adults")}
            name="adults"
            type="number"
            min="1"
            placeholder="1"
          />

          <FormField
            label={t("children")}
            name="children"
            type="number"
            min="0"
            placeholder="0"
          />
        </div>

        {/* MESSAGE */}
        <div className="min-w-0">
          <label
            htmlFor="message"
            className="block break-words font-semibold text-gray-800"
          >
            {t("message")}
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="mt-2 w-full min-w-0 resize-y rounded-xl border border-gray-300 px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200 sm:px-4 sm:text-base"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={tours.length === 0}
          className="w-full break-words rounded-xl bg-green-700 px-5 py-4 text-center font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:px-6"
        >
          {t("submit")}
        </button>

        <p className="break-words text-center text-sm leading-6 text-gray-500">
          {t("confirmationNotice")}
        </p>
      </form>
    </div>
  );
}