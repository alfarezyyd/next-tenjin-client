"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import 'react-toastify/dist/ReactToastify.css';
import AdminFullWrapper from "@/components/admin/AdminFullWrapper";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [oneTimePassword, setOneTimePassword] = useState(null);
  const [isSendingOTP, setIsSendingOTP] = useState(false); // Tambahkan state ini untuk mengatur loading pada tombol

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonStyle();
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
  }, [accessToken]);
  const {push} = useRouter();

  async function triggerSendOneTimeVerificationPassword() {
    setIsSendingOTP(true); // Set ke true saat pengiriman OTP dimulai
    try {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/generate-otp`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`
        }
      });

      if (responseFetch.ok) {
        toast.success('OTP sent successfully!', {position: 'top-right', autoClose: 3000});
      } else {
        toast.error('Failed to send OTP!', {position: 'top-right', autoClose: 3000});
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again!', {position: 'top-right', autoClose: 3000});
    } finally {
      setIsSendingOTP(false); // Set ke false setelah pengiriman selesai
    }
  }

  async function verifyOneTimePassword(e) {
    e.preventDefault();
    if (accessToken) {
      console.log("accessToken", oneTimePassword);
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}authentication/self/verify-otp/${oneTimePassword}`, {
        method: 'POST', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`
        }
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        if (responseBody['result']['data']) {
          push('/admin/settings/general-data?notify=success')
        } else {
          toast.error('An error occurred. Please try again!', {position: 'top-right', autoClose: 3000});
        }
      } else {
        toast.error('An error occurred. Please try again!', {position: 'top-right', autoClose: 3000});
      }
      console.log(responseBody);

    }

  }

  return (isLoading ? (<Loading/>) : (<AdminFullWrapper>
    <section className="section">
      <div className="container mt-5">
        <div className="row">
          <div
            className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="login-brand">
              <img src="../assets/img/stisla-fill.svg" alt="logo" width="100"
                   className="shadow-light rounded-circle"/>
            </div>

            <div className="card card-primary">
              <div className="card-header"><h4>Verify Email</h4></div>

              <div className="card-body">
                <p className="text-muted">We will send a link to reset your password</p>
                <form method="POST" onSubmit={verifyOneTimePassword}>
                  <div className="form-group">
                    <label htmlFor="text">Kode One Time Verification Password (OTP)</label>
                    <input id="text" type="text" className="form-control" name="text" tabIndex="1" required
                           autoFocus onChange={(e) => {
                      setOneTimePassword(e.target.value);
                    }}/>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                      Verify
                    </button>
                  </div>
                </form>
                <button
                  className="btn btn-outline-info btn-lg btn-block"
                  tabIndex="4"
                  onClick={triggerSendOneTimeVerificationPassword}
                  disabled={isSendingOTP} // Disable tombol saat loading
                >
                  {isSendingOTP ? "Loading..." : "Send OTP"}
                </button>
              </div>
            </div>
            <div className="simple-footer">
              Copyright &copy; Stisla 2018
            </div>
          </div>
        </div>
      </div>
    </section>
  </AdminFullWrapper>));
}