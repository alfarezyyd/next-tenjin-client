"use client"
import AuthWrapper from "@/components/auth/AuthWrapper";
import {Alert, Button, Input, InputOtp} from "@nextui-org/react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {EyeSlashFilledIcon} from "@/components/auth/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/auth/EyeFilledIcon";


export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState([]);
  const {push} = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [stepCount, setStepCount] = useState(0);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/generate-otp`, {
        method: 'POST', headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: email
        }),
      });
      console.log(await response.json());
      if (response.ok) {
        if (stepCount === 0) {
          setStepCount((count) => count + 1);
        }
        toast.success('OTP berhasil dikirim, mohon cek email Anda')
      } else {
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  async function triggerVerify(e) {
    setLoading(true);
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/verify-otp/${otp}`, {
        method: 'POST', headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: email,
        }),
      });
      console.log(await response.json());
      if (response.ok) {
        setStepCount((count) => count + 1);
        toast.success('OTP berhasil diverifikasi, silahkan masukkan password baru anda')
      } else {
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  async function triggerSubmitNewPassword(e) {
    setLoading(true);
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/reset-password`, {
        method: 'POST', headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json',
        }, body: JSON.stringify({
          email: 'kyozerakaramine@gmail.com',
          ...password,
        }),
      });
      console.log(await response.json());
      if (response.ok) {
        setStepCount((count) => count + 1);
        toast.success('Password berhasil diperbarui silahkan login kembali', {
          onClose: () => {
            window.location.href = '/auth/login'
          }
        })
      } else {
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (<AuthWrapper>
    <div
      className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-semibold text-navy-700 dark:text-white">
          Forgot your password?
        </h4>
        <p className="mb-3 ml-1 font-light text-base text-gray-400">
          No problem. Just let us know your email address and we will email you a password reset OTP that will allow
          you to choose a new one. !
        </p>

        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700"/>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700"/>
        </div>
        {stepCount === 0 && <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            fullWidth
            className="mb-3"
            required
            isLoading={loading}
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
            isLoading={loading}
            className="linear mt-2 w-full rounded-xl font-light bg-brand-500 py-[12px] text-base text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700">
            Email password reset OTP
          </Button>
        </form>}
        {stepCount === 1 && (<div className="flex flex-col items-start gap-5">
          <InputOtp length={6} value={otp} onValueChange={setOtp} size={"lg"}
                    classNames={{
                      segmentWrapper: "gap-x-5",
                    }}
                    description={"Isi dengan 6 digit kode yang dikirim melalui email"}/>
          <div className="flex flex-row justify-between gap-6 w-full">
            <Button
              type="submit"
              color={"primary"}
              size="lg"
              variant='ghost'
              isLoading={loading}
              onClick={handleSubmit}
            >
              Kirim OTP
            </Button>
            <Button
              type="submit"
              size="lg"
              isLoading={loading}

              onClick={triggerVerify}
              className="linear rounded-xl font-light bg-brand-500 py-[12px] text-base  text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Verifikasi OTP
            </Button>

          </div>
        </div>)}
        {stepCount === 2 && (<div className="flex flex-col items-start gap-5">
          <Input
            className="max-w-xl"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                )}
              </button>
            }
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => {
              setPassword({
                ...password,
                password: e.target.value,
              })
            }}
          />
          <Input
            className="max-w-xl"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                )}
              </button>
            }
            label="Confirm Password"
            placeholder="Enter your confirm password"
            type={isVisible ? "text" : "password"}
            variant="bordered" onChange={(e) => {
            setPassword({
              ...password,
              confirmPassword: e.target.value,
            })
          }}
          />
          <div className="flex flex-row justify-between gap-6 w-full">
            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              onClick={triggerSubmitNewPassword}
              className="linear rounded-xl font-light bg-brand-500 py-[12px] text-base  text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Submit
            </Button>

          </div>
        </div>)}
        {stepCount === 3 && (
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col w-full">
              <div className="w-full flex items-center my-3">
                <Alert color={'success'}
                       title={`Reset password berhasil mohon tunggu beberapa saat, Anda akan dialihkan ke halaman login`}/>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">

        </div>
      </div>
    </div>

  </AuthWrapper>)
}