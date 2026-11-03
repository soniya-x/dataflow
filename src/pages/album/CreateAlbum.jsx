import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateAlbumMutation } from "../../api/UserApi";
import AlbumForm from "../../components/album/AlbumForm";

function CreateAlbum() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");

  const [
    createAlbum,
    { isLoading, isError, error },
  ] = useCreateAlbumMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Please enter album title!");
      return;
    }

    const newAlbum = {
      title: title.trim(),
      userId: Number(id),
    };

    try {
      await createAlbum(newAlbum).unwrap();

      toast.success("Album created successfully!");

      navigate(`/users/${id}/albums`);
    } catch (err) {
      console.error("Failed to create album:", err);

      toast.error(
        err?.data?.message || "Failed to create album!"
      );
    }
  };

  return (
    <AlbumForm
      title={title}
      setTitle={setTitle}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onCancel={() => navigate(`/users/${id}/albums`)}
    />
  );
}

export default CreateAlbum;