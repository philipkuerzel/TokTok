import { useStore } from "@/zustand";
import Feed from "@/components/Feed";

const Home = () => {
  const { logout } = useStore()
  return (
    <>
      <Feed />
    </>
  );
};

export default Home;
