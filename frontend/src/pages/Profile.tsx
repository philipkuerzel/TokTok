import { useStore } from "@/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fulldata, UserData } from "@/zustand";
import ProfilePosts from "@/components/ProfilePosts";
import ProfileHero from "../components/ProfileHero";
import ProfileHeader from "@/components/ProfileHeader";

const Profile = () => {
  const { user, getUserdataFull } = useStore() as Fulldata & UserData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getUserdataFull(user[0]._id);
  }, [navigate, user, getUserdataFull]);

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
