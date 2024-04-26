import { useStore } from "@/zustand";

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
		</>
	);
};

export default Home;
