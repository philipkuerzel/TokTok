import LoginForm from "@/components/LoginForm";
import { Fulldata, UserData } from "@/zustand";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/zustand";

const Login = () => {
  const { user, loadCurrentUserData } = useStore() as Fulldata & UserData;
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
    loadCurrentUserData();
  }, [navigate, loadCurrentUserData]);
  
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
