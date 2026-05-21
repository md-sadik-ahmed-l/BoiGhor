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
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      //   callbackURL: "/",
    });
    // console.log(data);
    if (data) {
      (redirect("/"), toast.success("Sign in successful"));
    }else{
      toast.warning("Please enter a valid information")
    }
  };

  const handleSignIn = async () => {
      await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="max-w-xl mx-auto my-15">
      <Card className="bg-base-200 ">
        <h1 className="flex justify-center text-3xl font-bold my-5">Login</h1>
        <Form
          onSubmit={onSubmit}
          className="flex w-96 flex-col gap-4  mx-auto space-y-4"
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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
          <div className="flex justify-center items-center gap-2">
            <Button type="submit" className='w-full bg-zinc-700'>
              <Check />
              Login
            </Button>
            
          </div>
        </Form>
        <div className="space-y-3 flex w-96 flex-col  mx-auto">

          <h1 className="flex justify-center items-center mt-2">Or</h1>
          <div>
            <Button onClick={handleSignIn} variant="outline" className="w-full py-6">
              <FcGoogle />
              Sign in with Google
            </Button>
          </div>
          <div className="flex gap-1 justify-center items-center ">
            <h1>Don'n have an account?</h1>
            <Link
              href={"/register"}
              className="text-xl font-medium text-zinc-700 hover:bg-cyan-100 hover:rounded-md"
            >
              {" "}
              Sign Up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;


