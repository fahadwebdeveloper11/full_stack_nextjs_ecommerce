"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const user = useSession()?.data?.user;
//   console.log("user", user);

  return (
    <div className="flex items-start justify-center my-10">
      {" "}
      <div className="bg-white dark:bg-gray-800 max-w-[500px] sm:w-[35rem] overflow-hidden shadow rounded-lg border">
        <div className="flex justify-center p-2">
          <Image
            src={user?.avatar}
            alt="profile"
            width={200}
            height={200}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm dark:text-gray-300 text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y dark:divide-gray-500 sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</dt>
              <dd className="mt-1 text-sm dark:text-gray-100 text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.username}

                <br />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium dark:text-gray-400 text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm dark:text-gray-100 text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium dark:text-gray-400 text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm dark:text-gray-100 text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* {myOrders ? <div>{myOrders}</div> : <h1>No order</h1>} */}
    </div>
  );
};

export default Profile;
