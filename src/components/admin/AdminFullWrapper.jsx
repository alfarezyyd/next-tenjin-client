"use client"
import {useEffect, useState} from "react";
import {Loading} from "@/components/admin/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import "../../../public/assets/css/custom.scss"
import AdminTopbar from "@/components/admin/AdminTopbar";
import '@/../public/assets/css/components.css'
import '@/../public/assets/css/style.css'
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminFullWrapper({children}) {
  const [loading, setLoading] = useState(false);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  useEffect(() => {
    document.body.classList.add('layout-3'); // Tambahkan class layout-3
    const loadAssets = async () => {
      const jQueryModule = await import('jquery');
      window.jQuery = jQueryModule.default; // Also assign jQuery to window object
      await import('jquery-ui-dist/jquery-ui.min');
      await import('popper.js/dist/popper');
      await import('bootstrap/dist/js/bootstrap');
      await import('moment/moment');
      await import('tooltip.js/dist/tooltip.min');
    };

    if (typeof window !== "undefined") {
      loadAssets();
      setLoading(false);
    }

    setDecodedAccessToken(CommonUtil.parseJwt(Cookies.get('accessToken')));
    return () => {
      // Bersihkan class saat komponen di-unmount
      document.body.classList.remove('layout-3');
    };
  }, []);


  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div id="app">
          <div className="main-wrapper container">
            <div className="navbar-bg-full"></div>
            <AdminTopbar parsedJwt={decodedAccessToken}/>
            <div className="main-content">
              {children}
            </div>
            <AdminFooter/>
          </div>
        </div>
      )}
    </>
  )
}