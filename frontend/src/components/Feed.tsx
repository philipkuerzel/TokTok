import { useEffect, useState } from "react";
import { getFeed } from "@/lib/api";
import FeedCard from "./FeedCard";
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const refreshPage = async () => {
    await getFeed().then((json) => {
      setPosts(json);
    });
  };
  useEffect(() => {
    refreshPage();
  }, []);
  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <FeedCard post={post} refresh={refreshPage} />
          </div>
        );
      })}
    </>
  );
};

export default Feed;
