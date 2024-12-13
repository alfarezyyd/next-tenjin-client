"use client"
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {Loading} from "@/components/admin/Loading";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);
  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken])
  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import('jquery')).default;
      window.jQuery = $;
      await import('tooltip.js/dist/tooltip.min')
      await CommonScript();

    }
    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
  }, [])

  useEffect(() => {

  }, [loading]);
  return (loading ? (<Loading/>) : (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Settings</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
            <div className="breadcrumb-item">Settings</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Overview</h2>
          <p className="section-lead w-50">
            Atur preferensi akun, keamanan, dan notifikasi Anda dengan mudah di satu tempat. Sesuaikan pengaturan agar
            pengalaman Anda lebih personal dan nyaman.
          </p>

          <div className="row">
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-cog"></i>
                </div>
                <div className="card-body">
                  <h4>Informasi Pribadi</h4>
                  <p>Pengaturan mengenai data pribadi Anda yang harus dilengkapi sebelum melakukan order</p>
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/settings/general-data`} className="card-cta">Change
                    Setting <i
                      className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-search"></i>
                </div>
                <div className="card-body">
                  <h4>Password</h4>
                  <p>Pengaturan mengenai perubahan password yang dimiliki pengguna</p>
                  <a href="/admin/settings/password" className="card-cta">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="far fa-money-bill-alt"></i></div>
                <div className="card-body">
                  <h4>Rekening</h4>
                  <p>Pengaturan mengenai rekening yang digunakan oleh mentor</p>
                  <a href="/admin/settings/mentor-information-account" className="card-cta">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>

            {decodedAccessToken?.mentorId && (<>
              <div className="col-lg-6">
                <div className="card card-large-icons">
                  <div className="card-icon bg-primary text-white">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="card-body">
                    <h4>Informasi Mentor</h4>
                    <p>Perubahan mengenai data pribadi mentor yang dimiliki</p>
                    <a href="/admin/settings/mentor-information" className="card-cta">Change Setting <i
                      className="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              </div>
            </>)}
          </div>
        </div>
      </section>
    </AdminWrapper>)

  )
}