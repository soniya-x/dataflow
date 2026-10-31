import { FaEnvelope, FaPhone, FaGlobe, FaBuilding } from "react-icons/fa";
import Button from "../post/Button";


function UserCard({ user, onView, onAlbums, onTodos }) {
  if (!user) return null;

  return (
    <article
      onClick={onView}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="text-sm font-semibold text-cyan-600">
        User #{user.id}
      </span>

      <h2 className="my-3 text-xl font-bold text-slate-800">{user.name}</h2>

      <p className="mb-3 text-sm text-slate-500">@{user.username}</p>

      <div className="space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-cyan-600" />
          {user.email}
        </p>

        <p className="flex items-center gap-2">
          <FaPhone className="text-cyan-600" />
          {user.phone}
        </p>

        <p className="flex items-center gap-2">
          <FaGlobe className="text-cyan-600" />
          {user.website}
        </p>

        <p className="flex items-center gap-2">
          <FaBuilding className="text-cyan-600" />
          {user.company?.name}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="albums" onClick={onAlbums}>
          Albums
        </Button>

        <Button variant="todos" onClick={onTodos}>
          Todos
        </Button>
      </div>
    </article>
  );
}

export default UserCard;
