import React from "react";
import Input from "../common/Input";
import Form from "../common/Form";

function UserForm({
  name,
  username,
  email,
  phone,
  website,
  setName,
  setUsername,
  setEmail,
  setPhone,
  setWebsite,
  handleSubmit,
  isLoading,
  isError,
  error,
  onCancel,
  isEdit = false,
}) {
  return (
    <Form
      title={isEdit ? "Edit User" : "Create New User"}
      description={
        isEdit
          ? "Update user information."
          : "Enter details to create a new user."
      }
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEdit={isEdit}
      submitText={isEdit ? "Save User" : "Create User"}
      onCancel={onCancel}
    >
      <Input
        label="Full Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter full name"
        required
      />

      <Input
        label="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
      />

      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />

      <Input
        label="Website"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Enter website"
      />
    </Form>
  );
}

export default UserForm;