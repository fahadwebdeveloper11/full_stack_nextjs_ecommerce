"use client";
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
import { signInSchema } from "@/validationSchemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "-hook-form";


const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setIsSubmitting(false);
      toast({
        title: "Sign in failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      router.push("/");
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
        variant: "success",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center pt-6 my-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-10 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email or username" {...field} type="text" />
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
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="ml-2">Please wait...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account?{" "}
                <Link
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href="/sign-up"
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

export default SignIn;
