"use client"
import AuthWrapperCentered from "@/components/auth/AuthWrapperCentered";
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";


export default function Page() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const {push} = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/forgot-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });

      const responseBody = await response.json();
      if (response.ok) {
        push('/auth/login');  // Redirect to the dashboard or another protected route
      } else {
        switch (response.status) {
          case 404: {
            setErrors({
              email: "User with this email not found"
            })
            break;
          }
          default: {
            setErrors({
              email: "User with this email not valid",
              password: "User password incorrect"
            })
          }
        }
      }
    } catch (e) {
    }
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  return (
    <AuthWrapperCentered>
      <div
        className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        {/* Sign in section */}
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-semibold text-navy-700 dark:text-white">
            Forgot your password?
          </h4>
          <p className="mb-3 ml-1 font-light text-base text-gray-400">
            No problem. Just let us know your email address and we will email you a password reset link that will allow
            you to choose a new one. !
          </p>

          <div className="mb-6 flex items-center  gap-3">
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700"/>
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700"/>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Email */}

            <Input
              label="Email"
              name="email"
              fullWidth
              className="mb-3"
              required
              onChange={handleChange}
            />

            <div className="mb-4 flex items-center justify-between px-2 dark:text-white">
              <div className="flex items-center">
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="linear mt-2 w-full rounded-xl font-light bg-brand-500 py-[12px] text-base text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700">
              Email password reset link
            </Button>
          </form>
          <div className="mt-4">

          </div>
        </div>
      </div>

    </AuthWrapperCentered>
  )
}