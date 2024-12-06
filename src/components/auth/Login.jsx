"use client";
import {useEffect, useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {Button, Input} from "@nextui-org/react";
import Cookies from "js-cookie";
import {EyeSlashFilledIcon} from "@/components/auth/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/auth/EyeFilledIcon";
import {useRouter} from "next/navigation";
import Link from "next/link";


export default function Login() {
  const [loginRequest, setLoginRequest] = useState({
    email: '', password: '',
  });
  const [userError, setUserError] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);


  const handleChange = (e) => {
    setLoginRequest({
      ...loginRequest, [e.target.name]: e.target.value,
    });
  };


  const router = useRouter();
  useEffect(() => {
      // Ambil token dari URL
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search);

        const token = params.get('token');

        if (token) {
          setLoading(true);
          // Simpan token di cookie
          Cookies.set('accessToken', token);

          // Redirect ke halaman dashboard setelah login
          window.location.href = '/admin/dashboard';
        } else {
          // Jika tidak ada token, redirect ke halaman login
          router.push('/auth/login');
        }
      }
    },
    [window?.location.search, router]
  );
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setUserError({});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/login`, {
        method: 'POST', headers: {
          Accept: 'application/json', 'Content-Type': 'application/json',
        }, body: JSON.stringify(loginRequest),
      });

      const responseBody = await response.json();
      if (response.ok) {
        Cookies.set('accessToken', responseBody['result']['data']['accessToken']);
        window.location.href = '/admin/dashboard';

      } else {
        console.log(responseBody);
        switch (response.status) {
          case 404: {
            setUserError({
              email: "User with this email not found"
            })
            break;
          }
          default: {
            setUserError({
              email: "User with this email not valid", password: "User password incorrect"
            })
          }
        }
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
  }, []);
  return (<div
    className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
    {/* Sign in section */}
    <div className="mt-[4vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
      <h4 className="mb-2.5 text-4xl font-semibold text-navy-700 dark:text-white">
        Sign In
      </h4>
      <p className="mb-9 ml-1 font-light text-base text-black">
        Enter your email and password to sign in!
      </p>
      <Button as={Link} href={`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/google`} type="button"
              isLoading={loading}
              className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F4F7FE]
        hover:cursor-pointer">
        <div className="rounded-full text-xl">
          <FcGoogle/>
        </div>
        <h5 className="text-sm font-medium text-navy-700 dark:text-white">
          Sign In with Google
        </h5>
      </Button>
      <div className="mb-6 flex items-center  gap-3">
        <div className="h-px w-full bg-gray-200 dark:bg-navy-700"/>
        <p className="text-base text-gray-600 dark:text-white"> or </p>
        <div className="h-px w-full bg-gray-200 dark:bg-navy-700"/>
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
          errorMessage={userError.email ? userError.email : ""}
        />
        <Input
          label="Password"
          name="password"
          type={isVisible ? "text" : "password"}
          onChange={handleChange}
          fullWidth
          className="mb-3" // Mengatur ukuran font besar dan monospace
          required
          isInvalid={!!userError.password}
          errorMessage={userError.password ? userError.password : ""}
          classNames={{
            input: ["tracking-wide", "leading-tight"]
          }}
          endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility}
                              aria-label="toggle password visibility">
            {isVisible ? (<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>)}
          </button>}
        />

        <div className="mb-4 flex items-center justify-between px-2 dark:text-white">
          <div className="flex items-center">

          </div>
          <a
            className="text-sm mt-2 font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <Button
          type="submit"
          size="lg"
          isLoading={loading}
          color="primary"
          className="linear mt-2 w-full rounded-xl font-light bg-brand-500 py-[12px] text-base text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700">
          Sign In
        </Button>
      </form>
      <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-white">
            Not registered yet?
          </span>
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_URL}auth/register`}
          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        >
          Create an account
        </a>
      </div>
    </div>
  </div>);
}