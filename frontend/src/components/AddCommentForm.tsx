import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { addComment } from "@/lib/api";
import { useRef } from "react";
const AddCommentForm = ({ postId, userId }) => {
  console.log(postId);
  console.log(userId);
  const comment = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, userId).then((json) => {});
  };
  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input ref={comment} type="content" placeholder="comment here" />
        <Button onClick={handleSubmit} type="button">
          comment
        </Button>
      </div>
    </>
  );
};

export default AddCommentForm;
