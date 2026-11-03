import React from "react";
import Input from "../common/Input";
import Form from "../common/Form";

function AlbumForm({
  title,
  setTitle,
  handleSubmit,
  isLoading,
  isError,
  error,
  onCancel,
  isEdit = false,
}) {
  return (
    <Form
      title={isEdit ? "Edit Album" : "Create New Album"}
      description={
        isEdit
          ? "Update your album details."
          : "Enter a title to create a new album."
      }
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEdit={isEdit}
      submitText={isEdit ? "Save Album" : "Create Album"}
      onCancel={onCancel}
    >
      <Input
        label="Album Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter album title"
        required
      />
    </Form>
  );
}

export default AlbumForm;