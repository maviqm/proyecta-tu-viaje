"use client";

type DeleteTourButtonProps = {
  id: number;
  title: string;
  action: (formData: FormData) => void | Promise<void>;
};

export default function DeleteTourButton({
  id,
  title,
  action,
}: DeleteTourButtonProps) {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="font-semibold text-red-600 transition hover:text-red-800"
      >
        Delete
      </button>
    </form>
  );
}