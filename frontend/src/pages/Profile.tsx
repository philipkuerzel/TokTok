import { useStore } from "@/zustand";
import { Fulldata, UserData } from "@/zustand";
import ProfilePosts from "@/components/ProfilePosts";
import ProfileHero from "../components/ProfileHero";
import ProfileHeader from "@/components/ProfileHeader";

const Profile = () => {
  const { user } = useStore() as Fulldata & UserData;

  return (
    <>
      {user ? (
        <div>
          <ProfileHeader />
          <ProfileHero />
          <ProfilePosts />
        </div>
      ) : null}
    </>
  );
};

export default Profile;
