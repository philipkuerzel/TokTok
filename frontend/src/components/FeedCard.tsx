import { addLike, getUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";
import { useStore } from "@/zustand";
import { Fulldata, UserData } from "@/zustand";
import "./animations.css";

const FeedCard = ({ post, refresh }) => {
  const [userData, setUserData] = useState();
  const { user } = useStore() as Fulldata & UserData;
  const [isLiked, setIsLiked] = useState(post.likes.includes(user[0]?._id));
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    getUserData(post.authorId).then((json) => {
      setUserData(json);
    });
  }, []);

  const handleLike = async () => {
    setIsClicked(!isLiked);
    setIsLiked(!isLiked);
    await addLike(post._id, user[0]._id);
    refresh();
  };

  return (
    <>
      <section className="m-3">
        {userData?.map((data) => {
          return (
            <div key={data._id}>
              <FeedHeader profile={data} />
            </div>
          );
        })}
        <img className=" min-w-full rounded-3xl" src={post.imageUrl} alt="" />
        <div className="m-3 flex">
          <div className="flex m-3">
            <button onClick={handleLike}>
              <img
                className={isClicked ? "jello-horizontal" : ""}
                src={
                  post.likes.includes(user[0]?._id)
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
