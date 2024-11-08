import {usePathname} from "next/navigation";
import {CommonUtil} from "@/common/utils/common-util";

export default function AdminSidebar({parsedJwt}) {
  const pathname = usePathname();
  let pathNames = pathname.split("/").filter(segment => segment !== "");

  return (<div className="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div className="sidebar-brand">
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>TENJIN</a>
      </div>
      <div className="sidebar-brand sidebar-brand-sm">
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>TJN</a>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-header">Dashboard</li>
        <li className={`nav-item ${pathNames[0] === 'admin' && pathNames[1] === '' ? 'active' : ''}`}>
          <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`}>
            <i className="fas fa-fire"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="menu-header">PENGGUNA</li>
        <li className={`nav-item ${pathNames[1] === 'orders' ? 'active' : ''}`}>
          <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/orders`}>
            <i className="fas fa-receipt"></i>
            <span>Order</span>
          </a>
        </li>
        <li className={`nav-item ${pathNames[1] === 'settings' ? 'active' : ''}`}>
          <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/settings`}>
            <i className="fas fa-cogs"></i>
            <span>Pengaturan</span>
          </a>
        </li>
        <li className="nav-item dropdown">
          <a href="#" className="nav-link has-dropdown"><i className="fa-solid fa-coins"></i> <span>Keuangan</span></a>
          <ul className="dropdown-menu">
            <li><a className="nav-link" href="/admin/coins/top-up">Isi Saldo Koin</a></li>
            <li><a className="nav-link" href="/admin/coins/withdraw">Menarik Saldo</a></li>
          </ul>
        </li>

        {(parsedJwt && parsedJwt.mentorId) ? (<>
          <li className="menu-header">Mentor</li>
          <li className={`nav-item ${pathNames[1] === 'experiences' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-id-badge"></i>
              <span>Pengalaman</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[1] === 'experiences' && pathNames[2] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/experiences`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[1] === 'experiences' && pathNames[2] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/experiences/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[1] === 'educations' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-university"></i>
              <span>Pendidikan</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/educations`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/educations/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[1] === 'skills' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-medal"></i>
              <span>Kemampuan</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/skills`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[1] === 'skills' && pathNames[2] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/skills/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[1] === 'assistants' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-video"></i>
              <span>Assistensi</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/assistants`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[1] === 'assistants' && pathNames[2] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/assistants/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
        </>) : (<div className="p-3 hide-sidebar-mini">
          <a href="/mentors/register" className="btn btn-primary btn-lg btn-block btn-icon-split">
            <i className="fas fa-rocket"></i> Daftar Mentor
          </a>
        </div>)}

      </ul>


    </aside>
  </div>)
}