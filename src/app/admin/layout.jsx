import React from "react";
import { FaTable } from "react-icons/fa6";
import { MdOutlineHome } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import Link from "next/link";
import AdminSideNav from "@/components/Admin Components/Admin SideNav/AdminSideNav";
const Dashboard = ({ children }) => {
  return (
    <div className="block md:flex w-full h-full justify-between bg-[#EEEEEE] dark:bg-gray-900">
      <AdminSideNav />
      <div className="ml-[3.2rem] w-auto md:w-full ">{children}</div>
    </div>
  );
};

export default Dashboard;
