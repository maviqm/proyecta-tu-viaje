type TestimonialFormData = {
  name: string;
  countryEs: string;
  countryEn: string;
  tourEs: string;
  tourEn: string;
  tourSlug: string;
  commentEs: string;
  commentEn: string;
  rating: number;
  featured: boolean;
  active: boolean;
  displayOrder: number;
};

type TestimonialFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel?: string;
  initialData?: Partial<TestimonialFormData>;
};

export default function TestimonialForm({
  action,
  submitLabel = "Save Testimonial",
  initialData = {},
}: TestimonialFormProps) {
  return (
    <form
      action={action}
      className="space-y-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Traveler information
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-semibold text-gray-800"
            >
              Traveler name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={initialData.name ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="mb-2 block font-semibold text-gray-800"
            >
              Rating *
            </label>

            <input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              required
              defaultValue={initialData.rating ?? 5}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Country
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="countryEs"
              className="mb-2 block font-semibold text-gray-800"
            >
              Country in Spanish *
            </label>

            <input
              id="countryEs"
              name="countryEs"
              type="text"
              required
              defaultValue={initialData.countryEs ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="countryEn"
              className="mb-2 block font-semibold text-gray-800"
            >
              Country in English *
            </label>

            <input
              id="countryEn"
              name="countryEn"
              type="text"
              required
              defaultValue={initialData.countryEn ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Tour
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="tourEs"
              className="mb-2 block font-semibold text-gray-800"
            >
              Tour name in Spanish *
            </label>

            <input
              id="tourEs"
              name="tourEs"
              type="text"
              required
              defaultValue={initialData.tourEs ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="tourEn"
              className="mb-2 block font-semibold text-gray-800"
            >
              Tour name in English *
            </label>

            <input
              id="tourEn"
              name="tourEn"
              type="text"
              required
              defaultValue={initialData.tourEn ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="tourSlug"
              className="mb-2 block font-semibold text-gray-800"
            >
              Tour slug
            </label>

            <input
              id="tourSlug"
              name="tourSlug"
              type="text"
              defaultValue={initialData.tourSlug ?? ""}
              placeholder="example-tour-slug"
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <p className="mt-2 text-sm text-gray-500">
              Optional. It must match the slug of an existing tour.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Testimonial
        </h2>

        <div className="mt-6 grid gap-6">
          <div>
            <label
              htmlFor="commentEs"
              className="mb-2 block font-semibold text-gray-800"
            >
              Comment in Spanish *
            </label>

            <textarea
              id="commentEs"
              name="commentEs"
              required
              rows={6}
              defaultValue={initialData.commentEs ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="commentEn"
              className="mb-2 block font-semibold text-gray-800"
            >
              Comment in English *
            </label>

            <textarea
              id="commentEn"
              name="commentEn"
              required
              rows={6}
              defaultValue={initialData.commentEn ?? ""}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Display settings
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="displayOrder"
              className="mb-2 block font-semibold text-gray-800"
            >
              Display order
            </label>

            <input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min="0"
              step="1"
              defaultValue={initialData.displayOrder ?? 0}
              className="w-full rounded-xl border text-gray-900 placeholder:text-gray-400 border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-4">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={initialData.featured ?? true}
              className="h-5 w-5 rounded  border-gray-300 text-green-700 focus:ring-green-600"
            />

            <span>
              <span className="block font-semibold text-gray-900">
                Featured
              </span>

              <span className="text-sm text-gray-500">
                Show on the home page.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-4">
            <input
              name="active"
              type="checkbox"
              defaultChecked={initialData.active ?? true}
              className="h-5 w-5 rounded  border-gray-300 text-green-700 focus:ring-green-600"
            />

            <span>
              <span className="block font-semibold text-gray-900">
                Active
              </span>

              <span className="text-sm text-gray-500">
                Allow the testimonial to be displayed.
              </span>
            </span>
          </label>
        </div>
      </section>

      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="submit"
          className="rounded-xl bg-green-700 px-7 py-4 font-semibold text-white transition hover:bg-green-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}