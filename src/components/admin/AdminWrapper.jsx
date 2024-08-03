import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import dynamic from "next/dynamic";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../../../public/assets/css/components.css'
import '../../../public/assets/css/style.css';

if (typeof window !== "undefined") {
  import('jquery/src/jquery');
  import('popper.js/dist/popper');
  import('bootstrap/dist/js/bootstrap');
  import('jquery.nicescroll/jquery.nicescroll');
  import('moment/moment');
  import('../../../public/assets/js/scripts');
  import('../../../public/assets/js/custom');
}
// Dynamically import libraries that depend on window

export default function AdminWrapper({children}) {
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
  )
}