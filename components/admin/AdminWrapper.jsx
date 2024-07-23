import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

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