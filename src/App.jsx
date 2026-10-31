import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navabar";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import SearchPost from "./pages/SearchPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetails from "./pages/PostDetails";
import UserPage from "./pages/user/UserPage";
import AlbumPage from "./pages/album/AlbumPage";
import PhotosPage from "./pages/photos/PhotosPage";
import TodoPage from "./pages/todos/TodoPage";
function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/search-post" element={<SearchPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id/albums" element={<AlbumPage />} />{" "}
          <Route path="/albums/:id/photos" element={<PhotosPage />} />
          <Route path="/users/:id/todos" element={<TodoPage />} />

        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
