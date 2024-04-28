import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./pages/Home";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/users/register" element={<RegisterForm />} />
			</Routes>
		</>
	);
}

export default App;
