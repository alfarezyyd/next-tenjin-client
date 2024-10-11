import {usePathname} from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  let pathNames = pathname.split("/").filter(segment => segment !== "");
  return (
    <div className="main-sidebar sidebar-style-2">
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
          <li className={`nav-item ${pathNames[1] === 'order' ? 'active' : ''}`}>
            <a className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/order`}>
              <i className="fas fa-receipt"></i>
              <span>Order</span>
            </a>
          </li>


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
              <li className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === undefined ? 'active' : ''}`}>
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
              <li className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === undefined ? 'active' : ''}`}>
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
              <li className={`nav-item ${pathNames[1] === 'educations' && pathNames[2] === undefined ? 'active' : ''}`}>
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

          <li className="menu-header">Pengaturan</li>
          <li className="nav-item dropdown">
            <a href="#" className="nav-link has-dropdown"><i className="fa-solid fa-gears"></i><span>Modules</span></a>
            <ul className="dropdown-menu">
              <li><a className="nav-link" href="modules-calendar.html">Calendar</a></li>
              <li><a className="nav-link" href="modules-chartjs.html">ChartJS</a></li>
              <li><a className="nav-link" href="modules-datatables.html">DataTables</a></li>
              <li><a className="nav-link" href="modules-flag.html">Flag</a></li>
              <li><a className="nav-link" href="modules-font-awesome.html">Font Awesome</a></li>
              <li><a className="nav-link" href="modules-ion-icons.html">Ion Icons</a></li>
              <li><a className="nav-link" href="modules-owl-carousel.html">Owl Carousel</a></li>
              <li><a className="nav-link" href="modules-sparkline.html">Sparkline</a></li>
              <li><a className="nav-link" href="modules-sweet-alert.html">Sweet Alert</a></li>
              <li><a className="nav-link" href="modules-toastr.html">Toastr</a></li>
              <li><a className="nav-link" href="modules-vector-map.html">Vector Map</a></li>
              <li><a className="nav-link" href="modules-weather-icon.html">Weather Icon</a></li>
            </ul>
          </li>

          <li className="menu-header">Keuangan</li>
          <li className="nav-item dropdown">
            <a href="#" className="nav-link has-dropdown"><i className="fa-solid fa-coins"></i> <span>Modules</span></a>
            <ul className="dropdown-menu">
              <li><a className="nav-link" href="modules-calendar.html">Calendar</a></li>
              <li><a className="nav-link" href="modules-chartjs.html">ChartJS</a></li>
              <li><a className="nav-link" href="modules-datatables.html">DataTables</a></li>
              <li><a className="nav-link" href="modules-flag.html">Flag</a></li>
              <li><a className="nav-link" href="modules-font-awesome.html">Font Awesome</a></li>
              <li><a className="nav-link" href="modules-ion-icons.html">Ion Icons</a></li>
              <li><a className="nav-link" href="modules-owl-carousel.html">Owl Carousel</a></li>
              <li><a className="nav-link" href="modules-sparkline.html">Sparkline</a></li>
              <li><a className="nav-link" href="modules-sweet-alert.html">Sweet Alert</a></li>
              <li><a className="nav-link" href="modules-toastr.html">Toastr</a></li>
              <li><a className="nav-link" href="modules-vector-map.html">Vector Map</a></li>
              <li><a className="nav-link" href="modules-weather-icon.html">Weather Icon</a></li>
            </ul>
          </li>

          <li><a className="nav-link" href="credits.html"><i className="fas fa-pencil-ruler"></i>
            <span>Credits</span></a></li>
        </ul>

        <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
          <a href="https://getstisla.com/docs" className="btn btn-primary btn-lg btn-block btn-icon-split">
            <i className="fas fa-rocket"></i> Documentation
          </a>
        </div>
      </aside>
    </div>
  )
}