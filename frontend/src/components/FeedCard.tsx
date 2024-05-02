import { addLike, getUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";
import { useStore } from "@/zustand";
import { Fulldata, UserData } from "@/zustand";
import "./animations.css";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ post, refresh }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const { user } = useStore() as Fulldata & UserData;
  const [isLiked, setIsLiked] = useState(post?.likes.includes(user[0]?._id));
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const navigateToPost = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    getUserData(post?.authorId).then((json) => {
      setUserData(json);
    });
  }, []);

  const handleLike = async () => {
    setIsClicked(!isLiked);
    setIsLiked(!isLiked);
    await addLike(post._id, user[0]._id);
    refresh();
  };

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (loading) {
    return (
      <div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

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
        <img
          className=" min-w-full rounded-3xl aspect-square object-cover"
          src={post?.imageUrl}
          alt=""
        />
        <div className="m-3 flex">
          <div className="flex m-3">
            <button onClick={handleLike}>
              <img
                // className={isClicked ? "jello-horizontal" : ""}
                className={
                  post?.likes.includes(user[0]?._id) ? "jello-horizontal" : ""
                }
                src={
                  post?.likes.includes(user[0]?._id)
                    ? "./img/liked.svg"
                    : "./img/favorites.svg"
                }
                alt=""
              />
            </button>
            <p className="m-2 min-w-6">{post?.likes.length}</p>
          </div>
          <div className="flex m-3">
            <button
              onClick={() => {
                navigateToPost(post._id);
              }}
            >
              <img src="./img/comment.svg" alt="" />
            </button>
            <p className="m-2">{post?.comments.length}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedCard;
