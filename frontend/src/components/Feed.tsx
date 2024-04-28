import { useEffect, useState } from "react";
import {getFeed} from '@/lib/api'
import FeedCard from "./FeedCard";
const Feed = () => {

    const [posts, setPosts] = useState([])
    useEffect(()=> {
        getFeed().then((json)=> {
            console.log(json);
            setPosts(json)
        })
    }, [])
    return ( 
        <>
        {posts.map((post) => {
            return (
                <div key={post._id}>
                    <FeedCard 
                    post={post}
                    />
                </div>
            )
        })}
        </>
     );
}
 
export default Feed;