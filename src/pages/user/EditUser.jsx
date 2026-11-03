import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../api/UserApi";

import UserForm from "../../components/user/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(id);

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserMutation();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  // Fill form with existing user details
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setWebsite(user.website || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser({
        id: Number(id),
        name,
        username,
        email,
        phone,
        website,
      }).unwrap();

      navigate("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (isLoading) return <p>Loading user...</p>;

  if (isError) {
    return (
      <p>
        Error: {error?.data?.message || error?.error || "User not found"}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <UserForm
        name={name}
        username={username}
        email={email}
        phone={phone}
        website={website}
        setName={setName}
        setUsername={setUsername}
        setEmail={setEmail}
        setPhone={setPhone}
        setWebsite={setWebsite}
        handleSubmit={handleSubmit}
        isLoading={isUpdating}
        isError={false}
        isEdit={true}
        onCancel={() => navigate("/users")}
      />
    </div>
  );
};

export default EditUser;