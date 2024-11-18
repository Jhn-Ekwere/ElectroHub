import ChangePassword from "@/pages/changepassword";
import AboutUs from "../pages/about";
import ContactUs from "../pages/contact";
import Dashboard from "../pages/dashboard";
import ForgotPassword from "../pages/forgotpassword";
import Home from "../pages/home";
import Login from "../pages/login";
import OrderReceipt from "../pages/orderrecipt";
import Product from "../pages/product";
import ResetPassword from "../pages/resetpassword"; 
import Signup from "../pages/signup";
import SearchResult from "@/pages/search";

const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:resetToken", element: <ResetPassword /> },
  { path: "/change-password", element: <ChangePassword /> },
];

const inAppRoutes = [
  { path: "/", element: <Home /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/order/:orderId", element: <OrderReceipt /> },
  { path: "/s", element: <SearchResult /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/contact-us", element: <ContactUs /> },
];
export { authRoutes, inAppRoutes };
