import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import { api } from "@/lib/api";
const AddCommentForm = ({ postId, userId }) => {
  const commentRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await api
        .post(`posts/${postId}/${userId}`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: commentRef.current.value }),
        })
        .json();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="content"
          ref={commentRef}
          type="text"
          placeholder="comment here"
        />
        <Button onClick={handleSubmit} type="button">
          comment
        </Button>
      </div>
    </>
  );
};

export default AddCommentForm;
