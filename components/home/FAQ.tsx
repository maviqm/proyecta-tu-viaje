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
    <section
      id="faq"
      className="overflow-hidden bg-gray-50 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="mx-auto max-w-3xl min-w-0 text-center">
          <p className="break-words text-xs font-semibold uppercase tracking-widest text-green-700 sm:text-sm">
            {t("subtitle")}
          </p>

          <h2 className="mt-4 break-words text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-4 break-words text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>

        {/* BENEFITS */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3">
          <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-4 text-center sm:p-5">
            <p className="text-2xl" aria-hidden="true">
              ✓
            </p>

            <p className="mt-2 break-words text-sm font-bold leading-6 text-green-900 sm:text-base">
              {t("benefits.noAdvancePayment")}
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-4 text-center sm:p-5">
            <p className="text-2xl" aria-hidden="true">
              ✓
            </p>

            <p className="mt-2 break-words text-sm font-bold leading-6 text-green-900 sm:text-base">
              {t("benefits.directPayment")}
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-4 text-center sm:p-5">
            <p className="text-2xl" aria-hidden="true">
              ✓
            </p>

            <p className="mt-2 break-words text-sm font-bold leading-6 text-green-900 sm:text-base">
              {t("benefits.freeCancellation")}
            </p>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="mt-10 space-y-3 sm:mt-12 sm:space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <summary className="flex min-w-0 cursor-pointer list-none items-start justify-between gap-3 text-base font-bold leading-6 text-gray-900 sm:items-center sm:gap-4 sm:text-lg">
                <span className="min-w-0 flex-1 break-words">
                  {faq.question}
                </span>

                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center text-2xl leading-none text-green-700 transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-4xl break-words text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}