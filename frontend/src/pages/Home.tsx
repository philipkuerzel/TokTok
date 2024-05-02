import { useStore } from "@/zustand";
import Feed from "@/components/Feed";
import TabBar from "@/components/TabBar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import "../components/animations.css";
import { ThemeToggle } from "@/components/ThemeToggle";

const Home = () => {
	const { logout } = useStore() as { logout: () => void };

	return (
		<>
			{/* <button onClick={handleLogout}>Logout</button>
      <a href="/profile">Profile</a> */}
			<header className="flex m-3 justify-between items-center">
				<div className="flex m-3 items-center">
					<img className="max-h- max-w-7" src="./img/logo.jpg" alt="" />
					<h2 className="m-2">Cringestagram</h2>
				</div>
				<div className="m-3">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<img src="./img/settings.svg" alt="" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Billing</DropdownMenuItem>
							<DropdownMenuItem>Team</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Dark Mode</DropdownMenuLabel>
							<DropdownMenuItem>
								<ThemeToggle />
								<Switch className="m-2" />
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<Feed />
			<TabBar />
		</>
	);
};

export default Home;
