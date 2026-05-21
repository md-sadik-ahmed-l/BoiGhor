"use client";
import React from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Sign in successful");
      router.push("/");
    } else {
      toast.warning(error?.message || "Please enter valid information");
    }
  };

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="px-4 py-10 sm:py-16">
      <Card className="w-full max-w-xl mx-auto bg-base-200 p-5 sm:p-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6">
          Login
        </h1>

        <Form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-4"
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-zinc-700 text-white py-6"
          >
            <Check />
            Login
          </Button>
        </Form>

        <div className="w-full mt-5 space-y-4">
          <h1 className="text-center">Or</h1>

          <Button
            onClick={handleSignIn}
            variant="outline"
            className="w-full py-6 "
          >
            <FcGoogle size={22} />
            Sign in with Google
          </Button>

          <div className="flex flex-wrap justify-center items-center gap-1 text-sm sm:text-base">
            <h1>Don't have an account?</h1>

            <Link
              href="/register"
              className="font-medium text-zinc-700 hover:text-cyan-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;