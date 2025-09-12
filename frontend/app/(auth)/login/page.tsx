"use client";

import { LabelInputContainer } from "@/components/LabelContainer";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "@/store/store";
import { login } from "@/slices/authSlice";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4),
});

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<Dispatch>();

  const { loading, error } = useSelector((state: State) => state.auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await dispatch(login(values)).unwrap();
      if (result) {
        toast.success("Login Successfully");
        router.push("/cheatsheet");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
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
                      <Input
                        placeholder="projectmayhem@fc.com"
                        {...field}
                        disabled={loading}
                      />
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
                      <Input
                        placeholder="*******"
                        {...field}
                        type="password"
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </LabelInputContainer>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

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
