import { useStore } from "@/zustand";

const Home = () => {
  const { logout } = useStore() as { logout: () => void };
  const handleLogout = async () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
      <a href="/profile">Profile</a>
    </>
  );
};

export default Home;
