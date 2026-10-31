import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "User", path: "/users" },
  { name: "Posts", path: "/posts" },
  { name: "Create Post", path: "/create-post" },

  // { name: "Search Post", path: "/search-post" },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
            D
          </span>

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Data<span className="text-indigo-600">Flow</span>
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
