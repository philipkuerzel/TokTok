import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useStore } from "@/zustand";
import EditProfile from "./pages/EditProfile";

function App() {
  const { user, loadCurrentUserData } = useStore() as Fulldata & UserData;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    loadCurrentUserData();
  }, [navigate, loadCurrentUserData]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile/:userId" element={<EditProfile />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
}

export default App;
