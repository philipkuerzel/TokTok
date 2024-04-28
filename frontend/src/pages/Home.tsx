import { useStore } from "@/zustand";
import Feed from "@/components/Feed";

const Home = () => {
  const { logout } = useStore() as { logout: () => void };
  const handleLogout = async () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <a href="/profile">Profile</a>
      <Feed />
    </>
  );
};

export default Home;
