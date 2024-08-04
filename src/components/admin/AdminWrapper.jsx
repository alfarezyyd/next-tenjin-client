import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../../../public/assets/css/style.css';
import '../../../public/assets/css/components.css'

if (typeof window !== "undefined") {
  import('jquery/src/jquery');
  import('jquery-ui-dist/jquery-ui.min')
  import('popper.js/dist/popper');
  import('bootstrap/dist/js/bootstrap');
  import('nicescroll/dist/jquery.nicescroll.min')
  import('moment/moment');
  import('tooltip.js/dist/tooltip.min')
  import('../../../public/assets/js/scripts');
  import('../../../public/assets/js/custom');
}

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