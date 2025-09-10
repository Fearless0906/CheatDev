"use client";

import { BottomGradient } from "@/components/BottomGradient";
import { LabelInputContainer } from "@/components/LabelContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signup } from "@/server/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    re_password: z.string().min(6, "Password confirmation required"),
  })
  .refine((data) => data.password === data.re_password, {
    path: ["re_password"],
    message: "Password do not match",
  });

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await signup(values);
      if (result) {
        toast.success("Sign Up Successfully");
        router.push("/login");
      }
      setLoading(true);
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center w-full px-4">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to CheatDev
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quas
          minima expedita quaerat laboriosam sint sequi eaque velit cumque,
          beatae quam in quia omnis dicta, delectus, natus architecto veritatis
          ratione.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10"
          >
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Tyler" {...field} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Durden" {...field} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="projectmayhem@fc.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <FormField
                control={form.control}
                name="re_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              type="submit"
            >
              {loading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <span>
                  Sign Up &rarr;
                  <BottomGradient />
                </span>
              )}
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
