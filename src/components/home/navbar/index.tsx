import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "../../../assets/image/avatar.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import truck from "../../../assets/image/truck.png";
import logo from "../../../assets/image/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  BellAlertIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/auth";
import CartModal from "../../CartModal";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartEP, fetchCategoriesEP, fetchNotificationsEP, fetchProductsEP } from "../../../services";
//@ts-ignore
import { TimeAgo } from "react-datetime-ago";
import Markdown from "react-markdown";
import { CartProps, CategoryProps, OrderNotification, ProductItemProps } from "../../../types";
import { Input } from "@/components/ui/input";
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const cartItems: CartProps = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.auth);
  const menuItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About us",
      href: "/about-us",
    },
    {
      title: "Contact us",
      href: "/contact-us",
    },
    {
      title: "My Account",
      href: "/my-account",
    },
  ];

  //
  const { mutateAsync } = useMutation({
    mutationFn: (data) => addCartEP(data, user.id),
  });

  //  function to handle the form submission
  const submitHandler = async (data: any) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cartItems?.cartItems) submitHandler(cartItems?.cartItems);
  }, [isCartOpen === true]);

  isCartOpen && console.log(cartItems?.cartItems);

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategoriesEP,
  });
  const { data: notifications } = useQuery({
    queryKey: ["notifications", user.id],
    queryFn: () => fetchNotificationsEP(user.id),
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsEP,
  });

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const logoutSuccess = () => {
    dispatch(logout());
    toast.success("logged out successfully");
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      // Check for Enter key press
      setSearchTerm(event.target.value);
      searchProducts(searchTerm); // Call the provided onSearch function with searchTerm
    }
  };

  const searchProducts = (searchTerm: string) => {
    const results = products.filter((product: ProductItemProps) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return navigate(`/s?query=${searchTerm}`, { state: { results } });
  };

  return (
    <>
      <Navbar className="md:py-2 -py-1 text-default-600 " position="sticky">
        <NavbarContent className="md:hidden sm:flex ">
          <NavbarMenuToggle
            icon={isMenuOpen ? <XMarkIcon className="size-4" /> : <Bars3Icon className="size-4" />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className=" text-4xl cursor-pointer "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {!isSearchOpen ? (
            <NavbarBrand>
              <Link to="/">
                <img src={logo} alt="" className=" h-5" />
              </Link>
            </NavbarBrand>
          ) : (
            <div className="border flex gap-2 items-center rounded pl-1 w-full ">
              <MagnifyingGlassIcon className=" size-5  " />
              <Input
                type="email"
                placeholder="Search products"
                onKeyDown={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
               rounded-none w-full "
              />
            </div>
          )}
        </NavbarContent>

        <NavbarContent className="sm:flex gap-4 hidden " justify="start">
          <Link to="/">
            <NavbarBrand>
              <img src={logo} alt="" className=" h-8  mr-1 block " />
              <h1 className=" text-primary font-bold ">Electro hub</h1>
            </NavbarBrand>
          </Link>
        </NavbarContent>
        {/* <NavbarContent justify="center" className="w-[30em] hidden md:flex ">
          <div className="border flex gap-2 items-center rounded pl-1 w-full ">
            <MagnifyingGlassIcon className=" size-5  " />
            <Input
              type="email"
              placeholder="Search products"
              onKeyDown={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
             rounded-none w-full "
            />
          </div>
        </NavbarContent> */}

        <NavbarContent as="div" className="items-center  noFlexGrow w-fit md:gap-3 gap-1 " justify="end">
          {!isSearchOpen ? (
            <NavbarItem className=" md:hidden hover:bg-default-200 rounded-full p-2 ease-in-out duration-200 flex items-center ">
              <MagnifyingGlassIcon className=" md:hidden flex size-4 " onClick={() => setIsSearchOpen(true)} />
            </NavbarItem>
          ) : null}

          <NavbarItem className="p-1 hover:bg-gray-100 rounded-full relative ease-in-out duration-200 flex items-center cursor-pointer ">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <div className="">
                  {notifications?.length > 0 && (
                    <div className="w-[7px] h-[7px] rounded-full bg-red-600 absolute top-1 right-1 " />
                  )}

                  <BellAlertIcon className="md:size-5 size-4 m-1 hover:text-primary transform ease-in-out duration-250  " />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Notifications 📢</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications?.length > 0 ? (
                  <div className="text-tiny max-h-[18.125rem] scrollbar-hide overflow-auto">
                    {/* contents */}

                    {notifications?.map((item: OrderNotification) => (
                      <DropdownMenuItem
                        key={item.id}
                        className={` text-xs flex-col hover:text-white  justify-start flex items-start
                                cursor-pointer border-b md:w-[25rem] w-[18.75rem] hover:bg-primary ${
                                  item.isRead ? "text-gray-400" : "text-gray-800"
                                } `}
                        onClick={() => {
                          navigate(`/order/${item.shortId}`);
                        }}
                      >
                        <div className="flex w-full justify-between items-center">
                          <h3 className=" font-semibold"> {item.title}</h3>
                          <div className=" text-[.625rem] font-semibold ">
                            <TimeAgo date={item.createdAt} />
                          </div>
                        </div>
                        <Markdown>{item.message}</Markdown>
                      </DropdownMenuItem>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px]">No notifications.</p>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/*  */}
          </NavbarItem>
          <NavbarItem className=" relative hover:bg-gray-100 rounded-full p-1 mr-2 ease-in-out duration-200 flex items-center cursor-pointer">
            <div className=" w-fit h-fit flex items-center " onClick={handleCart}>
              <div className="   ">
                {cartItems?.cartTotalQuantity > 0 ? (
                  <div className="w-fit px-1 text-[10px] z-10 text-white h-fit rounded-full bg-red-600 absolute top-0 right-0 ">
                    {cartItems?.cartTotalQuantity}
                  </div>
                ) : null}

                <ShoppingCartIcon className="md:size-5 size-4 m-1 hover:text-primary transform ease-in-out duration-250  " />
              </div>
            </div>
          </NavbarItem>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  className=" w-full h-full overflow-hidden rounded-full "
                  src={user.profilePicture ? user?.profilePicture[0]?.url : ""}
                />
                <AvatarFallback>
                  <span aria-label="avatar" className=" w-full h-full overflow-hidden rounded-full " role="img">
                    <img src={avatar} alt="" />
                  </span>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user.isAuthenticated && (
                <>
                  <DropdownMenuItem className=" hover:text-white">
                    <p className="font-semibold">
                      Signed in as <span className="text-xs font-light">{user?.email}</span>
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className=" hover:text-white">
                    <Link to="my-account">My Account</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem className=" hover:text-white">Orders</DropdownMenuItem>
              <DropdownMenuItem className=" hover:text-white">Saved Items</DropdownMenuItem>
              {user.isAuthenticated ? (
                <DropdownMenuItem className=" hover:text-white" key="logout" color="danger" onClick={logoutSuccess}>
                  Log Out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className=" hover:text-white" key="logout" onClick={handleLogin}>
                  Log In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full "
                color={index === 1 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
                to={item.href}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className=" shadow border-b border-default-300 bg-white/80  text-default-600 md:px-[14%] px-[6%] py-1 flex  items-center justify-between ">
        <div className="flex gap-6 text-sm ">
          <Link
            to="/about-us"
            className={` ${location === "/about-us" && " text-accent"} cursor-pointer hidden md:block `}
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className={` ${location === "/contact-us" && " text-accent"} cursor-pointer hidden md:block `}
          >
            Contact
          </Link>
        </div>
        <div className="border max-w-[450px] hidden md:flex gap-2 items-center rounded pl-1 w-full ">
          <MagnifyingGlassIcon className=" size-5  " />
          <Input
            type="email"
            placeholder="Search products"
            onKeyDown={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
             rounded-none w-full "
          />
        </div>
        <div className="md:flex gap-2 cursor-default">
          <div className="md:w-[6em] w-[3em] md:relative absolute md:right-0 right-6 ">
            <img src={truck} alt="" className="w-full h-full " />
          </div>
          <div className="w-fit md:mr-0 mr-6 ">
            <p className="md:text-sm text-xs text-primary  ">Free Delivery</p>
            <p className="text-xs flex gap-1 md:flex-row ">
              For all orders above <span className="">₦100,000</span>
            </p>
          </div>
        </div>

        <CartModal isCartOpen={isCartOpen} handleCart={handleCart} cartItems={cartItems} />
      </div>
    </>
  );
}
