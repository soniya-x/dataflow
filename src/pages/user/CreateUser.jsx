import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../api/UserApi";
import UserForm from "../../components/user/UserForm";
function CreateUser() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  // RTK Query mutation
  const [
    createUser,
    {
      isLoading,
      isError,
      error,
    },
  ] = useCreateUserMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !username.trim() || !email.trim()) {
      toast.warning("Please fill in all required fields!");
      return;
    }

    const newUser = {
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: website.trim(),
    };

    try {
      await createUser(newUser).unwrap();

      toast.success("User created successfully!");

      navigate("/users");
    } catch (err) {
      console.error("Failed to create user:", err);

      toast.error(
        err?.data?.message || "Failed to create user!"
      );
    }
  };

  return (
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
      isLoading={isLoading}
      isError={isError}
      error={error}
      onCancel={() => navigate("/users")}
    />
  );
}

export default CreateUser;