import { Outlet } from "react-router-dom";
import Nav from "../components/home/navbar";
import Footer from "../components/home/footer"; 

const Applayout = () => {
 
  return (
    // <ProtectedRoute>
    <div className={`flex flex-col min-h-[100svh] `}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
    // </ProtectedRoute>
  );
};

export default Applayout;
