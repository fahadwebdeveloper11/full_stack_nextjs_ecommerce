"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import  { useState, useRef } from "react";

const VerifyEmail = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const params = useParams();

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsVerifying(true);

    try {
      const res = await axios.post(
        "/api/verify-email",
        {
          otp: otp.join(""),
          username: params.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    //   console.log(res);
      if (res.data.success) {
        router.push("/sign-in");
      }

      toast({
        title: res.data.message,
        description: "",
        variant: res.data.success ? "success" : "destructive",
      });
    } catch (error) {
    //   console.log(error);

      toast({
        title: "Verification failed",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (index, event) => {
    const value = event.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (value !== "" && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text");
    const newOtp = [...otp];
    const numbers = pasteData.split("").filter((char) => /^[0-9]$/.test(char));

    numbers.forEach((number, index) => {
      if (index < newOtp.length) {
        newOtp[index] = number;
      }
    });

    setOtp(newOtp);

    if (numbers.length > 0) {
      const focusIndex =
        numbers.length < otp.length ? numbers.length : otp.length - 1;
      inputsRef.current[focusIndex].focus();
    }
  };

  return (
    <div className="max-w-md mx-auto border my-10 rounded">
      <div className="text-center my-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-6">
          Verify Your Account
        </h1>
        <p className="mb-4">Enter the verification code sent to your email</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="shadow-md px-4 py-6"
        onPaste={handlePaste}
      >
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              className="w-12 h-12 dark:text-gray-900 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputsRef.current[index] = el)}
              required
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit">
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
