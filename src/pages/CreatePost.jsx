import { useState } from "react";
import { useCreatePostMutation,useAddCommentMutation} from "../api/postApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PostForm from "../components/post/PostForm";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comment,setComment]=useState("")

  const [createPost, { isLoading, isError, isSuccess, error }] =
    useCreatePostMutation();

    const [addComment, { isLoading: isAddingComment }] =
    useAddCommentMutation();

  // console.log("posr:", createPost);
  // console.log("Loading:", isLoading);
  // console.log("Error:", error);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Comment entered:", comment);
 


    if (!title.trim() || !body.trim()) {
      toast.warning("Please fill in all fields!");
      return;
    }

    try {
       const newPost=await createPost({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      }).unwrap();
      console.log("Created post:", newPost);

      // Step 2: Add Comment to the newly created Post
      if (comment.trim()) {
       const newComment= await addComment({
          postId: newPost.id,
          name: "Admin",
          email: "admin@gmail.com",
          body: comment.trim(),
        }).unwrap();

        console.log("Created comment:", newComment);
      }


      toast.success("Post created successfully!");
      
      navigate("/posts");
    } catch (err) {
      console.error("Failed to create post or error:", err);

      toast.error(err?.data?.message || "Failed to create post or error!");
    }
  };


  return (
 
  <PostForm
  title={title}
  body={body}
  comment={comment}
  setTitle={setTitle}
  setBody={setBody}
  setComment={setComment}
  handleSubmit={handleSubmit}
  isLoading={isLoading || isAddingComment}
  isError={isError}
  error={error}
  onCancel={() => navigate("/posts")}
/>
  
  );
}

export default CreatePost;
