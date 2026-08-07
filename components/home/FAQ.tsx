import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("FAQ");

  const faqs = [
    {
      question: t("items.reservation.question"),
      answer: t("items.reservation.answer"),
    },
    {
      question: t("items.confirmation.question"),
      answer: t("items.confirmation.answer"),
    },
    {
      question: t("items.payment.question"),
      answer: t("items.payment.answer"),
    },
    {
      question: t("items.noAdvancePayment.question"),
      answer: t("items.noAdvancePayment.answer"),
    },
     {
      question: t("items.cancellation.question"),
      answer: t("items.cancellation.answer"),
    },
    {
      question: t("items.contact.question"),
      answer: t("items.contact.answer"),
    },
  ];

  return (
    <section id="faq" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            {t("subtitle")}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
            <p className="text-2xl">✓</p>
            <p className="mt-2 font-bold text-green-900">
              {t("benefits.noAdvancePayment")}
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
            <p className="text-2xl">✓</p>
            <p className="mt-2 font-bold text-green-900">
              {t("benefits.directPayment")}
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
            <p className="text-2xl">✓</p>
            <p className="mt-2 font-bold text-green-900">
              {t("benefits.freeCancellation")}
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-gray-900">
                {faq.question}

                <span className="text-2xl text-green-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-4xl leading-7 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}