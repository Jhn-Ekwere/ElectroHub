import React, { useState } from "react";
//@ts-ignore
import logo from "../../../assets/image/logo.svg";
import { DashbordProducts } from "./DashbordProducts";
import { DashboardUsersTable } from "./DashboardUsersTable";
import { DashboardTab } from "./DashboardTab";
import { DashboardOrders } from "./DashboardOrders";
import { Header } from "./DashboardHeader";
import { DashboardMerchantsTable } from "./DashboardMerchantTable";
import { Link } from "react-router-dom";

import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function Overview() {
  const [activeTab, setActiveTab] = useState("Dashboard Overview");
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [usersSubTab, setUsersSubTab] = useState("Customers");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard Overview":
        return <DashboardTab />;
      case "Products":
        return <DashbordProducts />;
      case "Orders":
        return <DashboardOrders />;
      case "Users":
        // If you want to keep the Users table as the default view when "Users" is clicked, you can leave this case as is.

        switch (usersSubTab) {
          case "Merchants":
            return <DashboardMerchantsTable />;
          case "Customers":
            // Assuming you have a component for displaying customers
            return <DashboardUsersTable />;
          default:
            return <div>Welcome to the Dashboard</div>;
        }

      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-[100svh]">
      <aside className="md:w-64 shadow flex md:flex-col flex-row  border-r text-default-800 md:p-5 p-1">
        <Link to="/" className=" md:block hidden ">
          <div className="flex mb-20 mt-10 space-x-2 items-center ">
            <img src={logo} alt="Logo" className="md:w-10 w-6  h-auto " />{" "}
            <h1 className=" text-primary font-bold  text-xl  ">Electro hub</h1>
          </div>
        </Link>
        <div className="flex md:flex-col justify-between flex-row w-full ">
          {[
            { name: "Dashboard Overview", icon: <Squares2X2Icon className="size-5 " /> },
            { name: "Products", icon: <ShoppingBagIcon className="size-5 " /> },
            { name: "Orders", icon: <ShoppingCartIcon className="size-5 " /> },
            { name: "Users", icon: <UserGroupIcon className="size-5 " /> },
          ].map((item) => (
            <div
              key={item.name}
              className={`${
                activeTab.includes(item.name) || (item.name === "Users" && showUsersDropdown)
                  ? "bg-primary text-white "
                  : "  hover:text-primary hover:font-bold  "
              } items-center flex-row md:items-start cursor-pointer flex-1 flex md:flex-col items md:justify-start justify-center md:p-4 p-3 md:my-2 md:rounded  text-sm font-medium  `}
              onClick={() => {
                setActiveTab(item.name);
                if (item.name === "Users") {
                  setShowUsersDropdown(!showUsersDropdown);
                } else {
                  setShowUsersDropdown(false);
                }
              }}
            >
              <div className=" flex ">
                {item?.icon}
                <span className="ml-2 md:block hidden">
                  {item.name === "Dashboard Overview" ? "Dashboard" : item.name}
                </span>
              </div>
              <div className=" md:w-full md:ml-4">
                {item.name === "Users" && (
                  <ul className={`mt-2   ${showUsersDropdown ? "block" : "hidden"}`}>
                    <li
                      className={`cursor-pointer p-2 my-1 rounded flex gap-2 items-center text-sm font-medium  ${
                        usersSubTab === "Merchants"
                          ? "hover:bg-primary flex  w-full bg-accent hover:text-white "
                          : " bg-primary text-white "
                      }`}
                      onClick={() => setUsersSubTab("Merchants")}
                    >
                      <BuildingStorefrontIcon className="size-4 " />

                      <span className="ml-2 md:block hidden">Merchants</span>
                    </li>
                    <li
                      className={`cursor-pointer p-2 my-1 rounded items-center gap-2  text-sm font-medium hover:bg-primary ${
                        usersSubTab === "Customers" ? "hover:bg-primary flex  w-full bg-accent " : "bg-primary "
                      }`}
                      onClick={() => setUsersSubTab("Customers")}
                    >
                      <UsersIcon className="size-4" />

                      <span className="ml-2 md:block hidden">Customers</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div className="flex-1 overflow-y-auto  relative ">
        <Header />
        <main className="p-4">
          <h2 className="text-xl font-semibold my-4 ">{activeTab === "Users" ? usersSubTab : activeTab}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Overview;
