import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Fulldata, Posts, UserData, useStore } from "@/zustand";

const ProfileHero = () => {
  const { userDataFull, posts } = useStore() as Fulldata & UserData & Posts;
  const profileData = userDataFull[0];
  return (
    <>
      <Card className="w-full rounded-none border-none flex flex-col items-center shadow-none">
        <CardHeader className="p-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-40 h-40 border">
              <AvatarImage
                src={profileData.profilePictureUrl}
                className="w-full h-full object-cover"
              />
              <AvatarFallback>{profileData.username}</AvatarFallback>
            </Avatar>
            <a href={`http://localhost:5173/edit-profile/${profileData._id}`}>
              <img
                src="../img/profile-edit.svg"
                className="z-10 absolute top-[14rem] left-[60%] sm:left-[54%] sm:top-[40%]"
              />
            </a>
            <div className="text-3xl font-bold">{profileData.fullname}</div>
            <div className="text-xl">{profileData.job}</div>
            <div className="text-lg font-normal text-black-500">
              {profileData.bio}
            </div>
            <div className="text-lg font-normal text-black-700">
              <a href={`${profileData.website}`}>{profileData.website}</a>
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
              {" "}
              <div>
                <span className="font-bold">{posts.length}</span> Posts
              </div>
              <Separator orientation="vertical" />
              <div>
                <span className="font-bold">
                  {profileData.followers.length}
                </span>{" "}
                Follower
              </div>
              <Separator orientation="vertical" />
              <div>
                <span className="font-bold">
                  {profileData.following.length}
                </span>{" "}
                Following
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default ProfileHero;
