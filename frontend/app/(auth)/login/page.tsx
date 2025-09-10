"use client";

import { BottomGradient } from "@/components/BottomGradient";
import { LabelInputContainer } from "@/components/LabelContainer";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { login } from "@/server/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await login(values);
      if (result) {
        toast.success("Login Successfully");
        router.push("/dashboard");
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

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              type="submit"
            >
              {loading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <span>
                  Login &rarr;
                  <BottomGradient />
                </span>
              )}
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
