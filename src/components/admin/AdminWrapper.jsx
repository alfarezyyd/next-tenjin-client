"use client"
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
// Style
import '@/../public/assets/css/style.css'
import '@/../public/assets/css/custom.scss'
import {useEffect, useState} from 'react';
import {Loading} from "@/components/admin/Loading";
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";

export default function AdminWrapper({children}) {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [parsedAccessToken, setParsedAccessToken] = useState(null);
  useEffect(() => {
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
      setLoading(false)
    }
    setAccessToken(Cookies.get('accessToken'));
  }, []);
  useEffect(() => {
    setParsedAccessToken(CommonUtil.parseJwt(accessToken));
  }, [accessToken]);


  return (<>
    {loading ? (<Loading/>) : (<div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg"></div>
          <AdminNavbar parsedJwt={parsedAccessToken}/>
          {accessToken && <AdminSidebar parsedJwt={parsedAccessToken}/>}
          <div className="main-content">
            {children}
          </div>
          <AdminFooter/>
        </div>

      </div>
    )}
  </>);
}
