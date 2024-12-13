import {usePathname} from "next/navigation";

export default function AdminSidebar({parsedJwt}) {
  const pathname = usePathname();
  let pathNames = pathname.split("/").filter(segment => segment !== "");
  return (<div className="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div className="sidebar-brand">
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`}>TENJIN</a>
      </div>
      <div className="sidebar-brand sidebar-brand-sm">
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>TJN</a>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-header">Dashboard</li>
        <li className={`nav-item ${pathNames[0] === 'admin' && pathNames[1] === 'dashboard' ? 'active' : ''}`}>
          <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`}>
            <i className="fas fa-fire"></i>
            <span>Dashboard</span>
          </a>
        </li>
        {parsedJwt && parsedJwt.isManagement === false && (<>
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
          <li className={`nav-item ${pathNames[2] === 'withdraw' ? 'active' : ''}`}>
            <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/finance/withdraw`}>
              <i className="fa-solid fa-coins"></i>
              <span>Menarik Saldo</span>
            </a>
          </li>
        </>)}
        {parsedJwt && parsedJwt.isManagement && (<>
          <li className="menu-header">Management</li>
          <li className={`nav-item ${pathNames[2] === 'categories' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-bars"></i>
              <span>Kategori</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'categories' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/categories`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'categories' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link"
                   href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/categories/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'tags' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-tags"></i> <span>Tags</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'tags' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/tags`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'tags' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/tags/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'languages' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-comments"></i> Bahasa</a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'languages' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/languages`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'languages' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link"
                   href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/languages/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'withdraws' ? 'active' : ''}`}>
            <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/withdraws`}>
              <i className="fas fa-money-bill-wave"></i>
              <span>Withdraws</span>
            </a>
          </li>
        </>)}
        {(parsedJwt && parsedJwt.mentorId) ? (<>
          <li className="menu-header">Mentor</li>
          <li className={`nav-item ${pathNames[2] === 'experiences' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-id-badge"></i>
              <span>Pengalaman</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'experiences' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/experiences`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'experiences' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/experiences/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'educations' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-university"></i>
              <span>Pendidikan</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'educations' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/educations`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'educations' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/educations/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'skills' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-medal"></i>
              <span>Kemampuan</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'skills' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/skills`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'skills' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/skills/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'assistants' ? 'active' : ''}`}>
            <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-video"></i>
              <span>Assistensi</span>
            </a>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'assistants' && pathNames[3] === undefined ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/assistants`}>Lihat
                  Data</a>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'assistants' && pathNames[3] === "create" ? 'active' : ''}`}>
                <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/assistants/create`}>Buat
                  Data</a>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'bookings' ? 'active' : ''}`}>
            <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/bookings`}>
              <i className="fas fa-calendar-check"></i>
              <span>Booking</span>
            </a>
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