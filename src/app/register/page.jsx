"use client";

import React from "react";
import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
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

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
    });

    if (error) {
      toast.warning(error.message || "This user already exists");
      return;
    }

    if (data) {
      toast.success("Sign Up successful");
      router.push("/");
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
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Sign Up
        </h1>

        <Form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-4"
        >
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField name="image" type="url">
            <Label>Image Url</Label>
            <Input placeholder="Enter your image url" />
            <FieldError />
          </TextField>

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

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              className="w-full bg-zinc-700 text-white"
              type="submit"
            >
              <Check />
              Submit
            </Button>

            <Button
              className="w-full text-zinc-700"
              type="reset"
              variant="secondary"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="w-full mt-5 space-y-4">
          <h1 className="text-center">Or</h1>

          <Button
            onClick={handleSignIn}
            variant="outline"
            className="w-full py-6"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </Button>

          <div className="flex flex-wrap justify-center items-center gap-1 text-sm sm:text-base">
            <h1>Already have an account?</h1>

            <Link
              href="/login"
              className="font-medium text-zinc-700 hover:text-cyan-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;