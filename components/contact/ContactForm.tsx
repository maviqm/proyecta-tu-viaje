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
  // IMPORTANTE:
  // enviamos locale para obtener los nombres
  // de los tours en el idioma correcto.
  const tours = await getTourOptions(locale);

  const selectedTour = tours.find(
    (tour) => tour.slug === selectedSlug
  );

  const t = await getTranslations({
    locale,
    namespace: "Contact.form",
  });

  return (
    <div className="rounded-2xl bg-white p-7 shadow-md sm:p-10">
      <h2 className="text-3xl font-bold text-gray-900">
        {t("title")}
      </h2>

      <p className="mt-3 leading-7 text-gray-600">
        {t("description")}
      </p>

      {/* TRUST BOX */}
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
        <p className="font-bold text-green-900">
          {t("trustTitle")}
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-6 text-green-800">
          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>{t("trustNoAdvancePayment")}</span>
          </li>

          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>{t("trustDirectPayment")}</span>
          </li>

          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>{t("trustFreeCancellation")}</span>
          </li>
        </ul>
      </div>

      {/* FORM */}
      <form
        action="https://formspree.io/f/mjgngwwd"
        method="POST"
        className="mt-8 space-y-6"
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
          value={`http://localhost:3000/${locale}/thank-you`}
        />

        {/* NAME / EMAIL */}
        <div className="grid gap-6 sm:grid-cols-2">
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
        <div>
          <label
            htmlFor="tour"
            className="block font-semibold text-gray-800"
          >
            {t("tour")}
          </label>

          <select
            id="tour"
            name="tour"
            defaultValue={selectedTour?.slug ?? ""}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
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
            <p className="mt-2 text-sm text-red-600">
              {t("noTours")}
            </p>
          )}
        </div>

        {/* DATE / TIME / PEOPLE */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FormField
            label={t("preferredDate")}
            name="date"
            type="date"
          />

          <div>
            <label
              htmlFor="time"
              className="block font-semibold text-gray-800"
            >
              {t("preferredTime")}
            </label>

            <select
              id="time"
              name="time"
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
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
        <div>
          <label
            htmlFor="message"
            className="block font-semibold text-gray-800"
          >
            {t("message")}
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={tours.length === 0}
          className="w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {t("submit")}
        </button>

        <p className="text-center text-sm leading-6 text-gray-500">
          {t("confirmationNotice")}
        </p>
      </form>
    </div>
  );
}