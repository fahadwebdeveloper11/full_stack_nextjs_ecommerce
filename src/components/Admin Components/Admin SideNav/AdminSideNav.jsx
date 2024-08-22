"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTable } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";

const AdminSideNav = () => {
  const path = usePathname();

  return (
    // <div className=" pl-5 max-h-screen py-12">
    //   <ul className="flex flex-col items-start gap-5">
    //     <li className="flex items-center gap-3">
    //       <MdOutlineHome fontSize={"1.5rem"} />
    //       <Link href={"/admin"}>Home</Link>ٖ
    //     </li>
    //     <li className="flex items-center gap-3">
    //       <FaTable fontSize={"1.2rem"} />
    //       <Link href={"/admin/create-product"}>Create Products</Link>ٖ
    //     </li>
    //     <li className="flex items-center gap-3">
    //       <LiaShippingFastSolid fontSize={"1.4rem"} />
    //       <Link href={"/admin/all-orders"}>Orders</Link>ٖ
    //     </li>
    //   </ul>
    // </div>

    <div className="fixed md:sticky pt-16 md:pt-0 md:top-0 flex flex-col top-0 left-0 w-14 hover:w-56 md:w-56 bg-blue-900 dark:bg-gray-900 h-screen text-white transition-all duration-300 dark:border-r dark:border-opacity-70 z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Main
              </div>
            </div>
          </li>
          <li>
            <Link
              href="/admin"
              className={`${
                path === "/admin"
                  ? "dark:bg-gray-600 bg-blue-800 border-blue-500 dark:border-gray-400 border-l-4"
                  : "hover:border-blue-500 border-transparent"
              } relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4   dark:hover:border-gray-400 pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/create-product"}
              className={`${
                path === "/admin/create-product"
                  ? "dark:bg-gray-600 bg-blue-800 border-blue-500 dark:border-gray-400 border-l-4"
                  : "border-transparent hover:border-blue-500"
              } relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4  dark:hover:border-gray-400 pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaTable fontSize={"1.2rem"} />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Create Products
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/orders"}
              className={`${
                path === "/admin/orders"
                  ? "dark:bg-gray-600 bg-blue-800 border-blue-500 dark:border-gray-400 border-l-4"
                  : "border-transparent hover:border-blue-500"
              } relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 dark:hover:border-gray-400 pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <LiaShippingFastSolid fontSize={"1.4rem"} />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Orders
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/users"}
              className={`${
                path === "/admin/users"
                  ? "dark:bg-gray-600 bg-blue-800 border-blue-500 dark:border-gray-400 border-l-4"
                  : "border-transparent hover:border-blue-500"
              } relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 dark:hover:border-gray-400 pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current dark:text-white transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNav;
