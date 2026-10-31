import React from "react";
import { useGetAlbumsByUserIdQuery } from "../../api/postApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/post/Button";

const AlbumPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: albums, isLoading, isError } = useGetAlbumsByUserIdQuery(id);

  if (isLoading) {
    return <p className="p-6 text-center">Loading albums...</p>;
  }
  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">Failed to load albums!</p>
    );
  }

  return (
    <div className="mx-auto mx-w-7xl p-6">
      <Button
        variant="cancel"
        onClick={() => navigate("/users")}
        className="mb-6"
      >
        ← Back to Users
      </Button>
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        User #{id} Albums
      </h1>

      <p className="mb-8 text-slate-500">Total Albums: {albums?.length || 0}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums?.map((album) => (
          <div
            key={album.id}
            onClick={() => navigate(`/albums/${album.id}/photos`)}
            className=" cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="text-sm font-semibold text-purple-600">
              Album #{album.id}
            </span>

            <h2 className="mt-3 text-lg font-bold capitalize text-slate-800">
              {album.title}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              User ID: {album.userId}
            </p>
            <p className="mt-4 font-semibold text-cyan-600">View Photos →</p>
          </div>
        ))}
      </div>
      {albums?.length === 0 && (
        <p className="text-center text-slate-500">
          No albums found for this user.
        </p>
      )}
    </div>
  );
};

export default AlbumPage;
