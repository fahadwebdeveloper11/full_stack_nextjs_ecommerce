"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-blue-500/10">
        <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-5 mb-8 animate-bounce-slow">
          <CheckCircle className="w-20 h-20 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Order Success!
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed px-2">
          Thank you for your purchase. Your order has been placed and we've sent
          a confirmation to your email.
        </p>

        <div className="flex flex-col gap-4 w-full px-2">
          <Link href="/shop" className="w-full">
            <Button className="w-full h-14 text-lg font-semibold rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white">
              Continue Shopping
            </Button>
          </Link>
          {/* <Link href="/profile" className="w-full">
            <Button
              variant="outline"
              className="w-full h-14 text-lg font-semibold rounded-2xl border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
            >
              View My Order
            </Button>
          </Link> */}
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400 dark:text-gray-500 italic">
        Having trouble?{" "}
        <Link href="/contact" className="underline hover:text-blue-500">
          Contact Support
        </Link>
      </p>
    </div>
  );
};

export default SuccessPage;
