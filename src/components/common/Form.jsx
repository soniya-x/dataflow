import React from "react";
import Button from "./Button";

const Form = ({
  title,
  description,
  children,
  handleSubmit,
  isLoading = false,
  isError = false,
  error,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  isEdit = false,
}) => {
  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">{title}</h1>

        <p className="mb-6 text-slate-500">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {children}

          {isError && (
            <p role="alert" className="text-sm text-red-600">
              {error?.data?.message || "Unable to save data. Please try again."}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              variant={isEdit ? "saving" : "create"}
              loading={isLoading}
            >
              {submitText}
            </Button>

            <Button type="button" variant="cancel" onClick={onCancel}>
              {cancelText}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
