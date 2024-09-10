"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/validationSchemas/signUpScema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import useClientSide from "../../../hooks/client";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 500);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      avatar: "",
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (!avatar) {
      toast({
        title: "Avatar is required",
        description: "",
        variant: "destructive",
      });
      return setIsSubmitting(false);
    }
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please enter the same password in both fields",
        variant: "destructive",
      });
      return setIsSubmitting(false);
    }
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("avatar", avatar);

      const res = await axios.post("/api/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    //   console.log(res);

      if (res.data?.success) {
        toast({
          title: res.data?.message,
          description: "",
          variant: res.data?.success ? "success" : "destructive",
        });
      }

      router.push(`/verify/${data.username}`);
    } catch (error) {
    //   console.log(error);

      toast({
        title: "Sign up failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatarURL = useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : null;
  }, [avatar]);

  useEffect(() => {
    // console.log(debouncedUsername);
    const checkUsernameUnique = async () => {
      if (debouncedUsername[0]) {
        setUsernameMessage("");
        setIsCheckingUsername(true);

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername[0]}`
          );
          const message = response.data.message;
          setUsernameMessage(message);
        //   console.log(response);
        } catch (error) {
        //   console.log(error);
          setUsernameMessage(error.response?.data?.message);
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername[0]]);

  return (
    <section className="flex flex-col items-center pt-6 my-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <div className="w-32  h-32 rounded-full relative">
                        <Avatar className="absolute cursor-pointer w-full h-full">
                          <AvatarImage
                            src={avatarURL}
                            alt="@shadcn"
                            className="w-full h-full object-cover"
                          />
                          <AvatarFallback className="w-full h-full">
                            <img
                              src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </AvatarFallback>
                        </Avatar>
                        <Input
                          className="opacity-0 cursor-pointer w-full h-full"
                          accept="image/*"
                          type="file"
                          {...field}
                          onChange={(e) => {
                            const maxFileSize = 3 * 1024 * 1024;
                            const file = e.target.files[0];
                            if (file && file.size <= maxFileSize) {
                              form.clearErrors("avatar");
                              // field.onChange(e);
                              setAvatar(file);
                            } else {
                              form.setError("avatar", {
                                type: "manual",
                                message:
                                  "Image size should not be greater than 2MB",
                              });
                            }
                          }}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                    <p className="text-sm dark:text-white">Upload your image</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} type="text" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                        type="text"
                      />
                    </FormControl>
                    {!isCheckingUsername && usernameMessage && (
                      <p
                        className={`text-sm ${
                          usernameMessage === "Username is available"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    )}
                    {isCheckingUsername && (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isCheckingUsername}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="ml-2">Please wait...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href="/sign-in"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
