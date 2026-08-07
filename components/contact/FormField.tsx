type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  min?: string;
};

export default function FormField({
  label,
  name,
  type,
  placeholder,
  min,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-semibold text-gray-800"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
        required={name !== "children"}
      />
    </div>
  );
}