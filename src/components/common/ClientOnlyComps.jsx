"use client";

import AuthProvider from "@/context/AuthProvider";
import Theme from "../Theme/Theme";
import { Toaster as ShadCnToast } from "../ui/toaster";
import { Toaster } from "react-hot-toast";
import Navigation from "../Navbar/Navigation";



export default function ClientOnlyComps() {
  return (
    <>
      <Theme>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </Theme>
      <Toaster containerStyle={{ zIndex: 999999999 }} />
      <ShadCnToast />
    </>
  );
}
