"use client"
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import {useEffect} from 'react';

export default function AdminWrapper({children}) {

  useEffect(() => {
    const loadAssets = async () => {


      const jQueryModule = await import('jquery');
      window.jQuery = jQueryModule.default; // Also assign jQuery to window object
      await import('jquery-ui-dist/jquery-ui.min');
      await import('popper.js/dist/popper');
      await import('bootstrap/dist/js/bootstrap');
      await import('nicescroll/dist/jquery.nicescroll.min');
      await import('moment/moment');
      await import('tooltip.js/dist/tooltip.min');


    };

    if (typeof window !== "undefined") {
      loadAssets();
    }
  });


  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg"></div>
        <AdminNavbar/>
        <AdminSidebar/>
        <div className="main-content">
          {children}
        </div>
        <AdminFooter/>
      </div>
    </div>
  );
}