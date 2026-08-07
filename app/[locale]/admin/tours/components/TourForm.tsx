export type TourFormData = {
  title?: string;
  titleEs?: string;
  titleEn?: string;

  slug?: string;

  category?: string;
  categoryEs?: string;
  categoryEn?: string;

  location?: string;
  locationEs?: string;
  locationEn?: string;

  duration?: string;
  durationEs?: string;
  durationEn?: string;

  difficulty?: string | null;
  difficultyEs?: string | null;
  difficultyEn?: string | null;

  priceAdult?: number | string;
  priceChild?: number | string | null;

  shortDescription?: string;
  shortDescriptionEs?: string;
  shortDescriptionEn?: string;

  description?: string;
  descriptionEs?: string;
  descriptionEn?: string;

  image?: string | null;

  includes?: string[];
  includesEs?: string[];
  includesEn?: string[];

  whatToBring?: string[];
  whatToBringEs?: string[];
  whatToBringEn?: string[];

  featured?: boolean;
  active?: boolean;
};

type TourFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  initialData?: TourFormData;
  submitLabel?: string;
};

export default function TourForm({
  action,
  initialData,
  submitLabel = "Save Tour",
}: TourFormProps) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200";

  return (
    <form
      action={action}
      className="space-y-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      {/* BASIC INFORMATION */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Basic information
        </h2>

        <div className="mt-6 space-y-6">
          {/* TOUR NAME */}
          <div>
            <h3 className="font-bold text-gray-900">
              Tour name
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="font-semibold text-gray-800">
                Spanish
                <input
                  name="titleEs"
                  type="text"
                  required
                  defaultValue={
                    initialData?.titleEs ??
                    initialData?.title ??
                    ""
                  }
                  className={inputClass}
                />
              </label>

              <label className="font-semibold text-gray-800">
                English
                <input
                  name="titleEn"
                  type="text"
                  required
                  defaultValue={
                    initialData?.titleEn ??
                    initialData?.title ??
                    ""
                  }
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {/* SLUG */}
          <label className="block font-semibold text-gray-800">
            Slug
            <input
              name="slug"
              type="text"
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              defaultValue={initialData?.slug ?? ""}
              className={inputClass}
              placeholder="hanging-bridges"
            />

            <span className="mt-2 block text-sm font-normal text-gray-500">
              Use lowercase letters, numbers and hyphens only.
            </span>
          </label>

          {/* CATEGORY */}
          <div>
            <h3 className="font-bold text-gray-900">
              Category
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="font-semibold text-gray-800">
                Spanish
                <select
                  name="categoryEs"
                  required
                  defaultValue={
                    initialData?.categoryEs ??
                    initialData?.category ??
                    ""
                  }
                  className={inputClass}
                >
                  <option value="">
                    Seleccione una categoría
                  </option>
                  <option value="Aventura">Aventura</option>
                  <option value="Cultura">Cultura</option>
                  <option value="Naturaleza">Naturaleza</option>
                  <option value="Vida silvestre">
                    Vida silvestre
                  </option>
                </select>
              </label>

              <label className="font-semibold text-gray-800">
                English
                <select
                  name="categoryEn"
                  required
                  defaultValue={
                    initialData?.categoryEn ??
                    initialData?.category ??
                    ""
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select a category
                  </option>
                  <option value="Adventure">Adventure</option>
                  <option value="Culture">Culture</option>
                  <option value="Nature">Nature</option>
                  <option value="Wildlife">Wildlife</option>
                </select>
              </label>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <h3 className="font-bold text-gray-900">
              Location
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="font-semibold text-gray-800">
                Spanish
                <input
                  name="locationEs"
                  type="text"
                  required
                  defaultValue={
                    initialData?.locationEs ??
                    initialData?.location ??
                    "La Fortuna, Costa Rica"
                  }
                  className={inputClass}
                />
              </label>

              <label className="font-semibold text-gray-800">
                English
                <input
                  name="locationEn"
                  type="text"
                  required
                  defaultValue={
                    initialData?.locationEn ??
                    initialData?.location ??
                    "La Fortuna, Costa Rica"
                  }
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {/* DURATION */}
          <div>
            <h3 className="font-bold text-gray-900">
              Duration
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="font-semibold text-gray-800">
                Spanish
                <input
                  name="durationEs"
                  type="text"
                  required
                  defaultValue={
                    initialData?.durationEs ??
                    initialData?.duration ??
                    ""
                  }
                  className={inputClass}
                  placeholder="2 horas"
                />
              </label>

              <label className="font-semibold text-gray-800">
                English
                <input
                  name="durationEn"
                  type="text"
                  required
                  defaultValue={
                    initialData?.durationEn ??
                    initialData?.duration ??
                    ""
                  }
                  className={inputClass}
                  placeholder="2 hours"
                />
              </label>
            </div>
          </div>

          {/* DIFFICULTY */}
          <div>
            <h3 className="font-bold text-gray-900">
              Difficulty
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="font-semibold text-gray-800">
                Spanish
                <select
                  name="difficultyEs"
                  defaultValue={
                    initialData?.difficultyEs ??
                    initialData?.difficulty ??
                    "Fácil"
                  }
                  className={inputClass}
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </label>

              <label className="font-semibold text-gray-800">
                English
                <select
                  name="difficultyEn"
                  defaultValue={
                    initialData?.difficultyEn ??
                    initialData?.difficulty ??
                    "Easy"
                  }
                  className={inputClass}
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Prices
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="font-semibold text-gray-800">
            Adult price
            <input
              name="priceAdult"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.priceAdult ?? ""}
              className={inputClass}
            />
          </label>

          <label className="font-semibold text-gray-800">
            Child price
            <input
              name="priceChild"
              type="number"
              min="0"
              step="0.01"
              defaultValue={initialData?.priceChild ?? ""}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      {/* DESCRIPTIONS */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Descriptions
        </h2>

        <div className="mt-6 space-y-8">
          {/* SHORT DESCRIPTION */}
          <div>
            <h3 className="font-bold text-gray-900">
              Short description
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="block font-semibold text-gray-800">
                Spanish
                <textarea
                  name="shortDescriptionEs"
                  required
                  rows={4}
                  defaultValue={
                    initialData?.shortDescriptionEs ??
                    initialData?.shortDescription ??
                    ""
                  }
                  className={inputClass}
                />
              </label>

              <label className="block font-semibold text-gray-800">
                English
                <textarea
                  name="shortDescriptionEn"
                  required
                  rows={4}
                  defaultValue={
                    initialData?.shortDescriptionEn ??
                    initialData?.shortDescription ??
                    ""
                  }
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {/* FULL DESCRIPTION */}
          <div>
            <h3 className="font-bold text-gray-900">
              Full description
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="block font-semibold text-gray-800">
                Spanish
                <textarea
                  name="descriptionEs"
                  required
                  rows={8}
                  defaultValue={
                    initialData?.descriptionEs ??
                    initialData?.description ??
                    ""
                  }
                  className={inputClass}
                />
              </label>

              <label className="block font-semibold text-gray-800">
                English
                <textarea
                  name="descriptionEn"
                  required
                  rows={8}
                  defaultValue={
                    initialData?.descriptionEn ??
                    initialData?.description ??
                    ""
                  }
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Image
        </h2>

        <div className="mt-6">
          <label className="block font-semibold text-gray-800">
            Main image path
            <input
              name="image"
              type="text"
              defaultValue={initialData?.image ?? ""}
              className={inputClass}
              placeholder="/images/tours/example.jpg"
              pattern="^\/.*\.(jpg|jpeg|png|webp|avif)$"
              title="Use a public web path such as /images/tours/example.jpg"
            />

            <span className="mt-2 block text-sm font-normal text-gray-500">
              Use a path starting with /, for example:
              /images/tours/example.jpg.
            </span>
          </label>
        </div>
      </section>

      {/* TOUR DETAILS */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900">
          Tour details
        </h2>

        <div className="mt-6 space-y-8">
          {/* INCLUDES */}
          <div>
            <h3 className="font-bold text-gray-900">
              Includes
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="block font-semibold text-gray-800">
                Spanish
                <textarea
                  name="includesEs"
                  rows={6}
                  defaultValue={
                    initialData?.includesEs?.join("\n") ??
                    initialData?.includes?.join("\n") ??
                    ""
                  }
                  className={inputClass}
                />

                <span className="mt-2 block text-sm font-normal text-gray-500">
                  Escriba un elemento por línea.
                </span>
              </label>

              <label className="block font-semibold text-gray-800">
                English
                <textarea
                  name="includesEn"
                  rows={6}
                  defaultValue={
                    initialData?.includesEn?.join("\n") ??
                    initialData?.includes?.join("\n") ??
                    ""
                  }
                  className={inputClass}
                />

                <span className="mt-2 block text-sm font-normal text-gray-500">
                  Write one item per line.
                </span>
              </label>
            </div>
          </div>

          {/* WHAT TO BRING */}
          <div>
            <h3 className="font-bold text-gray-900">
              What to bring
            </h3>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <label className="block font-semibold text-gray-800">
                Spanish
                <textarea
                  name="whatToBringEs"
                  rows={6}
                  defaultValue={
                    initialData?.whatToBringEs?.join("\n") ??
                    initialData?.whatToBring?.join("\n") ??
                    ""
                  }
                  className={inputClass}
                />

                <span className="mt-2 block text-sm font-normal text-gray-500">
                  Escriba un elemento por línea.
                </span>
              </label>

              <label className="block font-semibold text-gray-800">
                English
                <textarea
                  name="whatToBringEn"
                  rows={6}
                  defaultValue={
                    initialData?.whatToBringEn?.join("\n") ??
                    initialData?.whatToBring?.join("\n") ??
                    ""
                  }
                  className={inputClass}
                />

                <span className="mt-2 block text-sm font-normal text-gray-500">
                  Write one item per line.
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 font-semibold text-gray-800">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            className="h-5 w-5"
          />
          Featured tour
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 font-semibold text-gray-800">
          <input
            name="active"
            type="checkbox"
            defaultChecked={initialData?.active ?? true}
            className="h-5 w-5"
          />
          Active tour
        </label>
      </section>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}