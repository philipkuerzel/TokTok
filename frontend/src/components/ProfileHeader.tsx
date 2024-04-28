import { Fulldata, UserData } from "@/zustand";
import { useStore } from "@/zustand";
import ProfileModal from "./ProfileModal";

const ProfileHeader = () => {
  const { userDataFull } = useStore() as Fulldata & UserData;
  const profileData = userDataFull[0];
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <img src="../img/logo.jpg" alt="" className="max-h-10" />
        <span className="text-xl font-bold">{profileData.username}</span>
      </div>
      <div className="flex items-center space-x-4">
        <img src="../img/add.svg" />
        <img src="../img/edit.svg" />
        <ProfileModal />
      </div>
    </header>
  );
};

export default ProfileHeader;
