import { getUserData } from "@/lib/api";
import { useEffect, useState } from "react";

const FeedCard = ({post}) => {
    const [userData, setUserData] = useState([])
    useEffect(()=> {
        getUserData(post.userId).then((json) => {
            setUserData(json)
        })
    }, [])
    return ( 
        <>
        <section>
            <div>
                <img src={userData.profilePictureUrl} alt="" />
                <div>
                    <h5>{post.username}</h5>
                    <p>job</p>
                </div>
            </div>
            <img src={post.imageUrl} alt="" />
            <div>...</div>
        </section>
        </>
     );
}
 
export default FeedCard;