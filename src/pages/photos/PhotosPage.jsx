import { useParams, useNavigate } from "react-router-dom";
import { useGetPhotosByAlbumIdQuery } from "../../api/postApi";
import Button from "../../components/post/Button";

const PhotosPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: photos, isLoading, isError } = useGetPhotosByAlbumIdQuery(id);

  if (isLoading) {
    return <p className="p-6 text-center">Loading photos...</p>;
  }
  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">Failed to load photos!</p>
    );
  }
  return (
    <div className="mx-auto max-w-7xl p-6">
      <Button
        variant="cancel"
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200"
      >
        ← Back to Albums
      </Button>
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        {" "}
        Albums #{id} photos
      </h1>
      <p className=" mb-8 text-slate-500">Total photos:{photos?.length || 0}</p>

      <div className=" grid gap-6 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4">
        {photos?.map((photo) => (
          <div
            key={photo.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <span className="text-sm font-semibold text-purple-600">
                photo #{photo.id}
              </span>

              <h2 className=" mt-2 font-semibold text-slate-800">
                {photo.title}
              </h2>
              <p className=" mt-2 text-s text-slate-500">
                Album ID:{photo.albumId}
              </p>
            </div>
          </div>
        ))}
      </div>

      {photos?.length === 0 && (
        <p className="text-center text-slate-500">
          No photos found in this album.
        </p>
      )}
    </div>
  );
};

export default PhotosPage;
