import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetPostsQuery, useUpdatePostMutation } from "../api/postApi";

import PostForm from "../components/post/PostForm";
import { toast } from "react-toastify";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get posts from RTK Query cache
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  // Find post by ID from cached posts
  const post = posts?.find((item) => Number(item.id) === Number(id));

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setBody(post.body || "");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.warning("Please fill in all fields!");
      return;
    }

    try {
      await updatePost({
        id: Number(id),
        title: title.trim(),
        body: body.trim(),
        userId: post?.userId || 1,
      }).unwrap();

      toast.success("Post updated successfully!");

      navigate("/posts");
    } catch (error) {
      console.error("Update failed:", error);

      toast.error(error?.data?.message || "Failed to update post!");
    }
  };

  if (isLoading) {
    return <p className="p-8 text-center">Loading post...</p>;
  }

  if (isError || !post) {
    return (
      <p className="p-8 text-center text-red-600">Unable to load this post.</p>
    );
  }

  return (
    <PostForm
      title={title}
      body={body}
      setTitle={setTitle}
      setBody={setBody}
      handleSubmit={handleSubmit}
      isLoading={isUpdating}
      isEdit={true}
      onCancel={() => navigate("/posts")}
    />
  );
}

export default EditPost;
