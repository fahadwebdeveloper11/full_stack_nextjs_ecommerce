"use client";
import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import "flowbite";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "../Theme/ThemeToggle";
import { Skeleton } from "../ui/skeleton";
const Navigation = () => {
  const path = usePathname();
  const { data: session, status } = useSession();
  // console.log("status", status);
  const [open, setOpen] = useState(false);
  const user = session?.user;

  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("flowbite/dist/flowbite");
    }
  }, []);

  return (
    <nav className="bg-white dark:text-white relative z-[999999] dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-2">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/logo.png"
            height={100}
            width={100}
            className="w-16 md:w-20 object-cover"
            alt="Logo"
          />
        </Link>
        <div className="flex md:order-2 items-center space-x-2 md:space-x-3 rtl:space-x-reverse">
          <ThemeToggle />
          <Link href={"/cart"} className="flex items-center justify-center ">
            <FaCartShopping fontSize={"1.7rem"} color="#be123c" />
          </Link>
          <div className="relative">
            {open && (
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-70 z-30"
                onClick={() => setOpen(false)} // Assuming you have a setOpen function to handle the state
              />
            )}
            {/* drawer init and toggle */}
            <div className="text-center">
              <button
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setOpen(!open)}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            {/* drawer component */}
            <div
              className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-64 dark:bg-gray-800
              duration-300 "
              style={{ left: open ? 0 : "-100%" }}
            >
              <h5
                id="drawer-navigation-label"
                className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
              >
                Pakmart
              </h5>
              <button
                onClick={() => setOpen(false)}
                type="button"
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
              <div className="py-4 overflow-y-auto">
                <ul className="space-y-1 font-medium">
                  <li onClick={closeDrawer}>
                    <Link
                      href="/"
                      className="flex items-center text-gray-900 rounded-lg dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 whitespace-nowrap">Home</span>
                    </Link>
                  </li>
                  <li onClick={closeDrawer}>
                    <Link
                      href="/shop"
                      className="flex items-center text-gray-900 rounded-lg dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 whitespace-nowrap">Shop</span>
                    </Link>
                  </li>
                  <li onClick={closeDrawer}>
                    <Link
                      href="/about"
                      className="flex items-center text-gray-900 rounded-lg dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 whitespace-nowrap">About</span>
                    </Link>
                  </li>
                  <li onClick={closeDrawer}>
                    <Link
                      href="/contact"
                      className="flex items-center text-gray-900 rounded-lg dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <span className="flex-1 whitespace-nowrap">
                        Contact Us
                      </span>
                    </Link>
                  </li>

                  {!user && (
                    <>
                      <li onClick={closeDrawer}>
                        <Link
                          href="/sign-in"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                            />
                          </svg>
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            Sign In
                          </span>
                        </Link>
                      </li>
                      <li onClick={closeDrawer}>
                        <Link
                          href="/sign-up"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                          </svg>
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            Sign Up
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {status === "loading" ? (
            <Skeleton className={"w-10 h-10 rounded-full"}/>
          ) : user ? (
            <ProfileMenu user={user} />
          ) : (
            <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
              <Link
                href={"/sign-up"}
                className="hidden md:block  w-full rounded bg-rose-600 px-5 py-2 whitespace-nowrap text-sm font-medium text-white duration-300 hover:bg-transparent hover:text-rose-700 sm:w-auto outline-2 outline outline-transparent hover:outline-rose-700"
              >
                Sign Up
              </Link>
              <Link
                href={"/sign-in"}
                className="md:flex hidden w-full rounded bg-transparent px-[2px] md:px-5 py-2 text-sm font-medium text-rose-700 outline outline-transparent outline-2 duration-300  sm:w-auto md:hover:outline-rose-700 items-center gap-1 "
              >
                Sign In
                <svg
                  className=" flex flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className=" flex-col hidden md:flex md:flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`${
                  path === "/"
                    ? "text-rose-500 dark:text-rose-500"
                    : "dark:text-white"
                } block py-2 px-3 rounded md:bg-transparent hover:text-rose-500 md:p-0 `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={`${
                  path === "/shop"
                    ? "text-rose-500    dark:text-rose-500"
                    : "dark:text-white"
                } block py-2 px-3 rounded md:bg-transparent hover:text-rose-500 md:p-0 `}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${
                  path === "/about"
                    ? "text-rose-500 dark:text-rose-500"
                    : "dark:text-white"
                } block py-2 px-3 rounded md:bg-transparent hover:text-rose-500 md:p-0 dark:text-white`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${
                  path === "/contact"
                    ? "text-rose-500 dark:text-rose-500"
                    : "dark:text-white"
                } block py-2 px-3 rounded md:bg-transparent hover:text-rose-500 md:p-0 `}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export function ProfileMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex text-sm rounded-full md:me-0  dark:focus:ring-gray-600">
          <span className="sr-only">Open user menu</span>
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={user?.avatar}
            alt="user photo"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 !z-[9999999] dark:bg-gray-900">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-5 w-5" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {user?.isAdmin && (
          <>
            <DropdownMenuGroup>
              <Link href={"/admin"}>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="h-5 w-5 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      id="dashboard"
                      className="dark:fill-white"
                    >
                      <path d="M57,12H7a3.00328,3.00328,0,0,0-3,3V49a3.00327,3.00327,0,0,0,3,3H57a3.00327,3.00327,0,0,0,3-3V15A3.00328,3.00328,0,0,0,57,12ZM6,15a1.00127,1.00127,0,0,1,1-1H57a1.00127,1.00127,0,0,1,1,1v3H6ZM58,49a1.00126,1.00126,0,0,1-1,1H7a1.00126,1.00126,0,0,1-1-1V20H58Z" />
                      <path d="M55.0098 15H55a1.00491 1.00491 0 1 0 .0098 0zM51 15h-.0098A1.00491 1.00491 0 1 0 51 15zM47.0049 15h-.0098a1.00491 1.00491 0 1 0 .0098 0zM9 24h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM9 28h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM9 32h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM9 36h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM39 34h8.8188a.99938.99938 0 0 0 .9834-1.18069 11.95632 11.95632 0 0 0-3.0557-6.0119L46.6255 25H51a1 1 0 0 0 0-2H46a1.00007 1.00007 0 0 0-.8994.56251l-.8999 1.8499a11.916 11.916 0 0 0-5.02-2.2146A.99939.99939 0 0 0 38 24.18121V33A1.0001 1.0001 0 0 0 39 34zm1-8.542A10.06564 10.06564 0 0 1 46.542 32H40zM55 25h.0098A1.00491 1.00491 0 1 0 55 25z" />
                      <path d="M55 26H52a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2zM27.5703 42.56251L26.3843 45H22.0098a1 1 0 0 0 0 2h5a1.00005 1.00005 0 0 0 .8994-.56249l1.1844-2.4337a11.97973 11.97973 0 0 0 19.7086-6.8231A.9994.9994 0 0 0 47.8188 36H36V24.18121a.99939.99939 0 0 0-1.1807-.9834 11.985 11.985 0 0 0-7.1864 19.2829A.926.926 0 0 0 27.5703 42.56251zM34 25.45651V37a1.0001 1.0001 0 0 0 1 1H46.5435A10.00237 10.00237 0 1 1 34 25.45651zM18.0098 47a1 1 0 0 0 0-2H18a1 1 0 0 0 .0098 2z" />
                      <path d="M18.0098,44h3a1,1,0,0,0,0-2h-3a1,1,0,0,0,0,2Z" />
                    </svg>
                  </span>

                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navigation;
