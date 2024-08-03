import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import dynamic from "next/dynamic";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../../../public/assets/css/components.css'
import '../../../public/assets/css/style.css';
// Dynamically import libraries that depend on window
dynamic(() => import('jquery/src/jquery'), {ssr: false});
dynamic(() => import('popper.js/dist/popper'), {ssr: false});
dynamic(() => import('bootstrap/dist/js/bootstrap'), {ssr: false});
dynamic(() => import('jquery.nicescroll/jquery.nicescroll'), {ssr: false});
dynamic(() => import('moment/moment'), {ssr: false});
dynamic(() => import('../../../public/assets/js/stisla'), {ssr: false});
dynamic(() => import('../../../public/assets/js/scripts'), {ssr: false});
dynamic(() => import('../../../public/assets/js/custom'), {ssr: false});

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