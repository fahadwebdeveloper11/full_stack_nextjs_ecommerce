"use client";

import { men_links_data, quick_links_data } from "@/constant/footerLinksData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const FooterLinks = ({ heading, links }) => {
  //   console.log(men_links_data);
  return (
    <div className="">
      <h1 className="text-white text-lg mb-5 md:mt-0 ">{heading}</h1>
      <Link href="#">
        {Array.isArray(links) &&
          links.map((link, i) => (
            <h3
              key={i}
              className="hover:underline text-[#BBB9B5] mt-3 font-medium text-base hover:tracking-wide duration-500"
            >
              {link}
            </h3>
          ))}
      </Link>
    </div>
  );
};

const MemoizedFooterLinks = memo(FooterLinks);

const Footer = () => {
  const pathname = usePathname();

  // console.log(pathname);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="w-full bg-gray-800">
      <div className="px-[10px] md:px-10 flex-wrap flex items-start gap-5 md:gap-14 justify-between mx-auto pb-12 md:pb-20 pt-14 border-b-[rgba(255,255,255,0.14)] border-b-[1px]">
        <div className="flex sm:flex-row flex-col md:items-start justify-between flex-wrap w-full gap-10">
          <Link href="/">
            <span className=" text-white whitespace-nowrap text-xl font-semibold dark:text-white">
              Pakmart
            </span>
          </Link>

          <MemoizedFooterLinks heading={"Shop Men"} links={men_links_data} />

          <MemoizedFooterLinks heading={"Shop Women"} links={men_links_data} />

          <MemoizedFooterLinks
            heading={"Baby Collection"}
            links={men_links_data}
          />

          <MemoizedFooterLinks
            heading={"Quick Links"}
            links={quick_links_data}
          />
        </div>
      </div>
      <div className="text-[#BBB9B5] text-center py-5 block md:inline-block w-[90%] md:w-full mx-auto sm:text-lg text-sm">
        Copyright ©2024 All rights reserved | This website is made
        <i className="ri-heart-fill text-[#FF2020]"></i> by{" "}
        <Link href="/" className="text-[#FF2020]">
          Fahad
        </Link>
      </div>
    </div>
  );
};

export default Footer;
