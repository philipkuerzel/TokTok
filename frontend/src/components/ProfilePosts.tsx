import { CardContent } from "@/components/ui/card";
import { Posts } from "@/zustand";
import { useStore } from "@/zustand";

const ProfilePosts = () => {
  const { posts } = useStore() as Posts;

  return (
    <>
      <CardContent className="p-0 flex flex-col items-center">
        <div className="grid grid-cols-3 gap-0.5 max-w-3xl">
          {posts.map((post) => (
            <a
              href={`post/${post._id}`}
              key={post._id}
              className="aspect-square"
            >
              <img
                alt={post.caption ? post.caption : "post"}
                className="aspect-square object-cover border-2 border-gray-100 border-t-0 border-l-0 w-full rounded-xl"
                height={400}
                src={post.imageUrl}
                width={400}
                key={post._id}
              />
            </a>
          ))}
        </div>
      </CardContent>
    </>
  );
};

export default ProfilePosts;
