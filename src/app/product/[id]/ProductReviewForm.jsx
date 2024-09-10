import ReviewCard from "@/components/common/Review Card/ReviewCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema } from "@/validationSchemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ProductReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const userId = useSession()?.data?.user?._id;

  const theme = "dark";

  const { data, isLoading, error } = useSWR(
    `/api/review/get-reviews/${productId}`,
    fetcher
  );

  // console.log("Review Data", data);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/review/create", {
        ...data,
        rating,
        userId,
        productId,
      });
      toast.success("Review created successfully");
      form.reset();
      setRating(0);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl py-5 sm:py-16 px-[10px] sm:px-6">
        <div className="flex justify-between gap-6 flex-wrap">
          <div className="w-full  sm:w-[63%]">
            <h1 className="text-2xl font-semibold dark:text-white text-[#202938] pb-2 border-b border-b-gray-300">
              Customer Reviews
            </h1>

            {/* Reviews List */}
            {isLoading
              ? Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={(Math.random() * 100000).toFixed(0)}
                      className="flex gap-4 py-6"
                    >
                      <div className="flex flex-col gap-2 items-center">
                        <Skeleton
                          className={"w-[80px] h-[80px] rounded-full"}
                        />
                        <Skeleton className={"w-[70px] mb-3 h-[14px]"} />
                        <Skeleton className={"w-[100px] h-[20px]"} />
                      </div>
                      <Skeleton className={"w-[70%] h-[150px]"} />
                    </div>
                  ))
              : data?.reviews?.map((review) => (
                  <ReviewCard
                    key={review._id}
                    name={review.name}
                    avatar={review?.user?.avatar}
                    comment={review.comment}
                    rating={review.rating}
                  />
                ))}
          </div>

          <div className="w-full sm:w-[33%]  px-2   lg:px-5">
            <h1 className="text-2xl font-semibold dark:text-white text-[#202938] mb-5">
              Write a Review
            </h1>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography
                fontSize={"18px"}
                fontWeight={"600"}
                component="legend"
                className="text-[#202938] dark:text-gray-100"
              >
                Rate us
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  // console.log("value", newValue);
                  setRating(newValue);
                }}
                max={5}
                sx={{
                  // Apply different colors based on the mode
                  color: theme === "dark" ? "#ffb400" : "#1976d2", // yellow for dark mode, default blue for light mode
                  "& .MuiRating-iconFilled": {
                    color: theme === "dark" ? "#ffb400" : "#1976d2",
                  },
                  "& .MuiRating-iconHover": {
                    color: theme === "dark" ? "#ffc107" : "#115293",
                  },
                }}
              />
            </Box>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div className="grid grid-cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Name</FormLabel> */}
                        <FormControl>
                          <Input
                            className="h-12 rounded-none"
                            placeholder="Name"
                            {...field}
                            type="text"
                            required
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Email</FormLabel> */}
                        <FormControl>
                          <Input
                            className="h-12 rounded-none"
                            placeholder="Email"
                            {...field}
                            type="email"
                            required
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Message</FormLabel> */}
                        <FormControl>
                          <Textarea
                            className="min-h-[160px] rounded-none"
                            placeholder="Your Review"
                            {...field}
                            type="text"
                            required
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className=" text-white w-full bg-[#202938] hover:bg-gray-900  rounded-none font-medium dark:bg-gray-900 dark:hover:bg-gray-950 text-sm px-5 py-2.5 text-center flex items-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="ml-2">Please wait...</span>
                    </>
                  ) : (
                    <>
                      Post Review
                      <FaArrowRightLong className="group-hover:translate-x-1.5 duration-300" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReviewForm;
