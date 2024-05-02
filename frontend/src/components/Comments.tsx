import { getComments, getUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";

const Comments = ({ commentData }) => {
  const [comments, setComments] = useState();
  const [author, setAuthor] = useState();
  const refreshComments = async () => {
    await getComments(commentData).then((json) => {
      setComments(json);
    });
  };

  const getAuthorDetails = async (id) => {
    await getUserData(id).then((json) => {
      setAuthor(json);
    });
  };

  useEffect(() => {
    refreshComments();
  }, []);

  useEffect(() => {
    if (comments?.authorId) {
      getAuthorDetails(comments.authorId);
    }
  }, [comments]);
  return (
    <>
      {author ? <FeedHeader profile={author[0]} /> : null}
      <p>{comments?.content}</p>
    </>
  );
};

export default Comments;
