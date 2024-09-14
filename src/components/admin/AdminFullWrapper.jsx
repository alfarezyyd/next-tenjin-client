"use client"
import {useEffect, useState} from "react";
import {Loading} from "@/components/admin/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import "../../../public/assets/css/custom.scss"
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminFullWrapper({children}) {
  const [loading, setLoading] = useState(false);
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
            <AdminTopbar/>
            <div className="main-content">
              {children}
            </div>
            <footer className="main-footer">
              <div className="footer-left">
                Copyright &copy; 2018 <div className="bullet"></div> Design By <a href="https://nauv.al/">Muhamad Nauval
                Azhar</a>
              </div>
              <div className="footer-right">
                2.3.0
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}