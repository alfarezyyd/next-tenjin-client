"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {FcGoogle} from "react-icons/fc";
import {Button, Input} from "@nextui-org/react";

export default function Login() {
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: '',
  });
  const [userError, setUserError] = useState({});
  const {push} = useRouter();

  const handleChange = (e) => {
    setLoginRequest({
      ...loginRequest,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError({});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authentication/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (response.ok) {
        push('/');  // Redirect to the dashboard or another protected route
      } else {
        const data = await response.json();
        setUserError(data.errors || {general: 'Login failed'});
      }
    } catch (e) {
      console.log(e)
    }

  };
  useEffect(() => {
  }, []);
  return (
    <div
      className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[4vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-semibold text-navy-700">
          Sign In
        </h4>
        <p className="mb-9 ml-1 font-light text-base text-black">
          Enter your email and password to sign in!
        </p>
        <Button
          className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F4F7FE] hover:cursor-pointer">
          <div className="rounded-full text-xl">
            <FcGoogle/>
          </div>
          <h5 className="text-sm font-medium text-navy-700">
            Sign In with Google
          </h5>
        </Button>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200"/>
          <p className="text-base text-gray-600"> or </p>
          <div className="h-px w-full bg-gray-200"/>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email */}

          <Input
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
            className="mb-3"
            required
            isInvalid={!!userError.email}
            errorMessage={userError.email ? userError.email[0] : ""}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            fullWidth
            className="mb-3"
            required
            isInvalid={!!userError.password}
            errorMessage={userError.password ? userError.password[0] : ""}
          />

          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">

            </div>
            <a
              className="text-sm mt-2 font-medium text-brand-500 hover:text-brand-600"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="linear mt-2 w-full rounded-xl font-light bg-brand-500 py-[12px] text-base text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700">
            Sign In
          </Button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700">
            Not registered yet?
          </span>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`}
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}