import { addLike } from "@/lib/api";
import { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";
import { Store, useStore, User } from "@/zustand";
import "./animations.css";

const FeedCard = ({ post }) => {
  const { user, getUserById, loadCurrentUserData } = useStore() as Store;
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id));
  const [isClicked, setIsClicked] = useState(false);
  const [author, setAuthor] = useState<User>({} as User);

  const handleLike = async () => {
    setIsClicked(!isLiked);
    setIsLiked(!isLiked);
    await addLike(post._id, user!._id);
    loadCurrentUserData();
  };

  useEffect(() => {
    getUserById(post.authorId).then((json: User) => {
      setAuthor(json);
    });
  }, [post.authorId]);

  return (
    <>
      <section className="m-3">
        <FeedHeader key={post._id} profile={author} />
        <img className=" min-w-full rounded-3xl" src={post.imageUrl} alt="" />
        <div className="m-3 flex">
          <div className="flex m-3">
            <button onClick={handleLike}>
              <img
                className={isClicked ? "jello-horizontal" : ""}
                src={
                  post.likes.includes(user?._id)
                    ? "./img/liked.svg"
                    : "./img/favorites.svg"
                }
                alt=""
              />
            </button>
            <p className="m-2 min-w-6">{post.likes.length}</p>
          </div>
          <div className="flex m-3">
            <button>
              <img src="./img/comment.svg" alt="" />
            </button>
            <p className="m-2">{post.comments.length}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedCard;
