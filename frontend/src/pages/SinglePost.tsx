import AddCommentForm from "@/components/AddCommentForm";
import Comments from "@/components/Comments";
import FeedCard from "@/components/FeedCard";
import FeedHeader from "@/components/FeedHeader";
import { addLike, getSinglePost, getUserData } from "@/lib/api";
import { useStore } from "@/zustand";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();

  const [singlePost, setSinglePost] = useState();
  const [authorDetails, setAuthorDetails] = useState([]);
  const [userData, setUserData] = useState();
  const { user } = useStore() as Fulldata & UserData;
  const [isLiked, setIsLiked] = useState(
    singlePost?.likes.includes(user[0]?._id)
  );
  const [isClicked, setIsClicked] = useState(false);

  const getAuthorDetails = async (id) => {
    await getUserData(id).then((json) => {
      setAuthorDetails(json);
    });
  };

  const refreshSinglePost = async () => {
    await getSinglePost(postId).then((json) => {
      setSinglePost(json);
      getAuthorDetails(json.authorId);
    });
  };

  const getTimeSince = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const difference = now - postDate; // Differenz in Millisekunden
    const hours = Math.floor(difference / 3600000); // Umrechnung in Stunden

    if (hours > 24 && hours < 48) {
      const days = Math.floor(hours / 24);
      return `${days} day ago`;
    } else if (hours > 48) {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    }
    return `${hours} hours ago`;
  };
  const [animateLike, setAnimateLike] = useState(false);
  const handleLike = async () => {
    setIsClicked(!isClicked);
    if (!singlePost?.likes.includes(user[0]?._id)) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000); // Annahme: Animation dauert 1000ms
    }
    setIsLiked(!isLiked);
    await addLike(singlePost._id, user[0]._id);
    refreshSinglePost(postId);
  };

  useEffect(() => {
    refreshSinglePost();
  }, []);
  return (
    <>
      <header>
        <div>
          <img src="" alt="" />
          <h3>Comments</h3>
        </div>
        <img src="" alt="" />
      </header>
      <FeedHeader profile={authorDetails[0]} />
      <main className="m-2">
        <p>{singlePost?.caption}</p>
        <p>{getTimeSince(singlePost?.date)}</p>
        {/* <FeedCard post={singlePost} refresh={refreshSinglePost} /> */}
        <section>
          <div className="m-3 flex">
            <div className="flex m-3">
              <button onClick={handleLike}>
                <img
                  className={animateLike ? "jello-horizontal" : ""}
                  //   className={
                  //     singlePost?.likes.includes(user[0]?._id)
                  //       ? "jello-horizontal"
                  //       : ""
                  //   }
                  src={
                    singlePost?.likes.includes(user[0]?._id)
                      ? "/img/liked.svg"
                      : "/img/favorites.svg"
                  }
                  alt=""
                />
              </button>
              <p className="m-2 min-w-6">{singlePost?.likes.length}</p>
            </div>
            <div className="flex m-3">
              <button>
                <img src="/img/comment.svg" alt="" />
              </button>
              <p className="m-2">{singlePost?.comments.length}</p>
            </div>
          </div>
        </section>
      </main>
      {singlePost?.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <Comments commentData={comment} />
          </div>
        );
      })}
      <AddCommentForm
        postId={singlePost?._id}
        userId={user[0]?._id}
        refresh={refreshSinglePost}
      />
    </>
  );
};

export default SinglePost;
