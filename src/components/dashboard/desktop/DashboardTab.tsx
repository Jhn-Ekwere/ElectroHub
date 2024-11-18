import { formatCurrency } from "../../../utils/formatter";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchMatricsEP, fetchOrdersPerDayEP, fetchProductsPerDayEP, fetchUsersPerDayEP } from "../../../services";
import { useState } from "react";
import { ArchiveBoxIcon, ShoppingBagIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
} from "recharts";

export function DashboardTab() {
  const user = useSelector((state: any) => state.auth);

  //matrics
  const {
    isPending,
    error,
    data: matrics,
  } = useQuery({
    queryKey: ["matrics"],
    queryFn: fetchMatricsEP,
    staleTime: 10 * 1000,
  });

  //getOrdersPerDay
  const {
    // isPending,
    // error,
    data: ordersPerDay,
  } = useQuery({
    queryKey: ["ordersPerDay"],
    queryFn: fetchOrdersPerDayEP,
    staleTime: 10 * 1000,
  });

  // users-per-day
  const {
    // isPending,
    // error,
    data: usersPerDay,
  } = useQuery({
    queryKey: ["usersPerDay"],
    queryFn: fetchUsersPerDayEP,
    staleTime: 10 * 1000,
  });

  //getProductsPerDay
  const {
    // isPending,
    // error
    data: productsParDay,
  } = useQuery({
    queryKey: ["productsParDay"],
    queryFn: fetchProductsPerDayEP,
    staleTime: 10 * 1000,
  });

  return (
    <div className=" text-xs space-y-8">
      <h1 className="">Welcome, {user?.firstName}!</h1>
      <div className="flex flex-wrap gap-4">
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Income</h2>
            <p className="md:text-3xl text-lg ">{formatCurrency(parseInt(matrics?.totalIncome))}</p>
          </div>
          <div className="">
            <WalletIcon className="md:size-6 size-5" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Products</h2>
            <p className="md:text-3xl text-lg ">{matrics?.totalProducts}</p>
          </div>
          <div className="">
            <ArchiveBoxIcon className="md:size-6 size-5" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Orders</h2>
            <p className="md:text-3xl text-lg ">{matrics?.totalOrders}</p>
          </div>
          <div className="">
            <ShoppingBagIcon className="md:size-6 size-5" />
          </div>
        </div>
        <div className="md:bg-primary md:w-fit w-full bg-white/80  md:text-white text-primary  md:p-6 p-4 rounded-lg shadow flex justify-between items-center gap-4 hover:text-white ease-in-out duration-150 hover:bg-primary/80 ">
          <div className=" w-[220px] ">
            <h2 className="md:text-sm text-xs uppercase   ">Total Users</h2>
            <p className="md:text-3xl text-lg ">{matrics?.totalUsers}</p>
          </div>
          <div className="">
            <UserIcon className="md:size-6 size-5" />
          </div>
        </div>
        {/* Add more metrics as needed */}
      </div>

      <div className="grid md:grid-cols-3 gap-4 ">
        {ordersPerDay.length > 0 && (
          <div className="  bg-[#ffffff]  col-span-2 p-6 border rounded-lg shadow ">
            <h1 className="">Daily Sales</h1>
            <div className=" w-full h-[400px]">
              <ResponsiveContainer>
                <LineChart
                  width={500}
                  height={300}
                  data={ordersPerDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                  {/* <XAxis dataKey="date" tick={{ fill: "#did5db" }} tickLine={false} /> */}
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} unit="" />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {productsParDay.length > 0 && (
          <div className="bg-[#ffffff] p-6 rounded-lg border shadow">
            <h1 className="">Top Products</h1>
            <div className=" w-full h-[400px]">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="date" name="date" unit="" />
                  <YAxis type="number" dataKey="totalProducts" name="products" unit="" />
                  <Legend />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Products per day" data={productsParDay} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {usersPerDay.length > 0 && (
          <div className="bg-[#ffffff]  col-span-2 p-6 border rounded-lg shadow ">
            <h1 className="">Daily User</h1>
            <div className=" w-full h-[400px]">
              <ResponsiveContainer>
                <BarChart width={5} height={40} data={usersPerDay}>
                  <Bar dataKey="totalUsers" fill="#8884d8" />
                  {/* <XAxis dataKey="date" tick={{ fill: "#did5db" }} tickLine={false} /> */}
                  <YAxis />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
