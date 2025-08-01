import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterComponent from "./config/router";
import Home from "./pages/home";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeEP } from "./services";
import { useQuery } from "@tanstack/react-query";
import { logout } from "./redux/auth";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  const { isPending, error, data } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMeEP(),
    staleTime: 6 * 60 * 60 * 1000,
  });

  const user = useSelector((state: any) => state.auth);
  const isJwtExpired = data?.message === "jwt expired";
  const isUser = !!data && !isJwtExpired;

  useEffect(() => {
    if (isPending) {
      return; // Do not proceed if still pending
    }
    if (isUser === false || error !== null) {
      dispatch(logout());
    }
  }, [isUser, error, isPending]);

  return (
    <div className="bg-[#fbf9fc]">
      <ToastContainer position="top-left" />
      {isPending ? (
        <div className="flex items-center justify-center h-screen">Loading...</div>
      ) : (
        <RouterComponent user={user} isUser={isUser} />
      )}
    </div>
  );
}
