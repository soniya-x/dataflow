import React from "react";
import Input from "./Input";
import Button from "./Button";

const PostForm = ({
  title,
  body,
  comment,
  setTitle,
  setBody,
  setComment,
  handleSubmit,
  isLoading = false,
  isError = false,
  error,
  isEdit = false,
  onCancel,
}) => {
  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          {isEdit ? "Edit Post" : "Create New Post"}
        </h1>

        <p className="mb-6 text-slate-500">
          {isEdit
            ? "Update your post details."
            : "Add a title and description for your post."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Post Title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />

          <Input
            label="Description"
            name="body"
            type="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your post..."
            required
            rows={5}
          />

       <Input
  label="Comments (Optional)"
  name="comment"
  type="textarea"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="Write Comments..."
  rows={3}
/>

          {isError && (
            <p role="alert" className="text-sm text-red-600">
              {error?.data?.message || "Unable to save post. Please try again."}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              variant={isEdit ? "saving" : "create"}
              loading={isLoading}
            >
              {isEdit ? "Save Post" : "Create Post"}
            </Button>

            <Button type="button" variant="cancel" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostForm;
