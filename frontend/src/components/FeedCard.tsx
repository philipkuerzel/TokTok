const FeedCard = ({post}) => {
    return ( 
        <>
        <section>
            <div>
                <img src={post.imageUrl} alt="" />
                <div>
                    <h5>{post.username}</h5>
                    <p>job</p>
                </div>
            </div>
            <div>...</div>
        </section>
        </>
     );
}
 
export default FeedCard;