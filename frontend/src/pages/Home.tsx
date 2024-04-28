import { useStore } from "@/zustand";
import Feed from "@/components/Feed";

const Home = () => {
	const { logout } = useStore();
	const handleLogout = async () => {
		logout();
		window.location.href = "/login";
	};
	return (
		<>
			<div>Home</div>
			<button onClick={handleLogout}>Logout</button>
<Feed />
		</>
	);
};

export default Home;


