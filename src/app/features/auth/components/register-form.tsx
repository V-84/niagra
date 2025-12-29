"use client";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import z from "zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";

const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    // Handle register logic here
    authClient.signUp(
      {
        name: values.email,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success(
            "Registration successful! Please check your email to verify your account.",
          );
          router.push("/login");
        },
        onError: (error) => {
          toast.error(`Registration failed: ${error.message}`);
        },
      },
    );
    router.push("/dashboard");
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Get Started</CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid-gab-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isPending}
                    type="button"
                  >
                     <Image
                                          alt="GitHub"
                                          src="/logos/github.svg"
                                          width={20}
                                          height={20}
                                        />
                    {" "}
                    Continue with Github{" "}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isPending}
                    type="button"
                  >
                     <Image
                                          alt="Google"
                                          src="/logos/google.svg"
                                          width={20}
                                          height={20}
                                        />
                    {" "}
                    Continue with Google{" "}
                  </Button>
                </div>

                <div className="grid gab-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <Button className="w-full" disabled={isPending} type="submit">
                    {" "}
                    register{" "}
                  </Button>
                </div>
                <div className="text-sm text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
