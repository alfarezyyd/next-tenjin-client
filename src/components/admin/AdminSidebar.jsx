import {usePathname} from "next/navigation";
import Link from "next/link";

export default function AdminSidebar({parsedJwt}) {
  const pathname = usePathname();
  let pathNames = pathname.split("/").filter(segment => segment !== "");
  return (<div className="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div className="sidebar-brand">
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`}>TENJIN</Link>
      </div>
      <div className="sidebar-brand sidebar-brand-sm">
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>TJN</Link>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-header">Dashboard</li>
        <li className={`nav-item ${pathNames[0] === 'admin' && pathNames[1] === 'dashboard' ? 'active' : ''}`}>
          <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`}>
            <i className="fas fa-fire"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="menu-header">PENGGUNA</li>
        <li className={`nav-item ${pathNames[1] === 'orders' ? 'active' : ''}`}>
          <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/orders`}>
            <i className="fas fa-receipt"></i>
            <span>Order</span>
          </Link>
        </li>
        <li className={`nav-item ${pathNames[1] === 'settings' ? 'active' : ''}`}>
          <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/settings`}>
            <i className="fas fa-cogs"></i>
            <span>Pengaturan</span>
          </Link>
        </li>
        <li className={`nav-item dropdown ${pathNames[0] === 'admin' && pathNames[1] === 'finance' ? 'active' : ''}`}>
          <Link href="#" className="nav-link has-dropdown"><i className="fa-solid fa-coins"></i>
            <span>Keuangan</span></Link>
          <ul className="dropdown-menu">
            <li className={`nav-item ${pathNames[2] === 'top-up' ? 'active' : ''}`}><Link className="nav-link"
                                                                                          href="/admin/finance/top-up">Isi
              Saldo</Link></li>
            <li className={`nav-item ${pathNames[2] === 'withdraw' ? 'active' : ''}`}>
              <Link className="nav-link" href="/admin/finance/withdraw">Menarik
                Saldo</Link></li>
          </ul>
        </li>
        <li className="menu-header">Management</li>
        <li className={`nav-item ${pathNames[2] === 'categories' ? 'active' : ''}`}>
          <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
            <i className="fas fa-bars"></i>
            <span>Kategori</span>
          </Link>
          <ul className="dropdown-menu">
            <li
              className={`nav-item ${pathNames[2] === 'categories' && pathNames[3] === undefined ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/categories`}>Lihat
                Data</Link>
            </li>
            <li
              className={`nav-item ${pathNames[2] === 'categories' && pathNames[3] === "create" ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/categories/create`}>Buat
                Data</Link>
            </li>
          </ul>
        </li>
        <li className={`nav-item ${pathNames[2] === 'tags' ? 'active' : ''}`}>
          <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
            <i className="fas fa-tags"></i> <span>Tags</span>
          </Link>
          <ul className="dropdown-menu">
            <li
              className={`nav-item ${pathNames[2] === 'tags' && pathNames[3] === undefined ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/tags`}>Lihat
                Data</Link>
            </li>
            <li
              className={`nav-item ${pathNames[2] === 'tags' && pathNames[3] === "create" ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/tags/create`}>Buat
                Data</Link>
            </li>
          </ul>
        </li>
        <li className={`nav-item ${pathNames[2] === 'languages' ? 'active' : ''}`}>
          <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
            <i className="fas fa-comments"></i> Bahasa</Link>
          <ul className="dropdown-menu">
            <li
              className={`nav-item ${pathNames[2] === 'languages' && pathNames[3] === undefined ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/languages`}>Lihat
                Data</Link>
            </li>
            <li
              className={`nav-item ${pathNames[2] === 'languages' && pathNames[3] === "create" ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/languages/create`}>Buat
                Data</Link>
            </li>
          </ul>
        </li>
        <li className={`nav-item ${pathNames[2] === 'withdraws' ? 'active' : ''}`}>
          <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
            <i className="fas fa-money-bill-wave"></i> Withdraw</Link>
          <ul className="dropdown-menu">
            <li
              className={`nav-item ${pathNames[2] === 'withdraws' && pathNames[3] === undefined ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/withdraws`}>Lihat
                Data</Link>
            </li>
            <li
              className={`nav-item ${pathNames[2] === 'withdraws' && pathNames[3] === "create" ? 'active' : ''}`}>
              <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/management/withdraws/create`}>Buat
                Data</Link>
            </li>
          </ul>
        </li>

        {(parsedJwt && parsedJwt.mentorId) ? (<>
          <li className="menu-header">Mentor</li>
          <li className={`nav-item ${pathNames[2] === 'experiences' ? 'active' : ''}`}>
            <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-id-badge"></i>
              <span>Pengalaman</span>
            </Link>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'experiences' && pathNames[3] === undefined ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/experiences`}>Lihat
                  Data</Link>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'experiences' && pathNames[3] === "create" ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/experiences/create`}>Buat
                  Data</Link>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'educations' ? 'active' : ''}`}>
            <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-university"></i>
              <span>Pendidikan</span>
            </Link>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'educations' && pathNames[3] === undefined ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/educations`}>Lihat
                  Data</Link>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'educations' && pathNames[3] === "create" ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/educations/create`}>Buat
                  Data</Link>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'skills' ? 'active' : ''}`}>
            <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-medal"></i>
              <span>Kemampuan</span>
            </Link>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'skills' && pathNames[3] === undefined ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/skills`}>Lihat
                  Data</Link>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'skills' && pathNames[3] === "create" ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/skills/create`}>Buat
                  Data</Link>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'assistants' ? 'active' : ''}`}>
            <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-video"></i>
              <span>Assistensi</span>
            </Link>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'assistants' && pathNames[3] === undefined ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/assistants`}>Lihat
                  Data</Link>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'assistants' && pathNames[3] === "create" ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/assistants/create`}>Buat
                  Data</Link>
              </li>
            </ul>
          </li>
          <li className={`nav-item ${pathNames[2] === 'bookings' ? 'active' : ''}`}>
            <Link href="#" className="nav-link has-dropdown" data-toggle="dropdown">
              <i className="fas fa-calendar-check"></i>
              <span>Booking</span>
            </Link>
            <ul className="dropdown-menu">
              <li
                className={`nav-item ${pathNames[2] === 'bookings' && pathNames[3] === undefined ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/bookings`}>Lihat
                  Data</Link>
              </li>
              <li
                className={`nav-item ${pathNames[2] === 'bookings' && pathNames[3] === "create" ? 'active' : ''}`}>
                <Link className="nav-link" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/bookings/create`}>Buat
                  Data</Link>
              </li>
            </ul>
          </li>
        </>) : (<div className="p-3 hide-sidebar-mini">
          <Link href="/mentors/register" className="btn btn-primary btn-lg btn-block btn-icon-split">
            <i className="fas fa-rocket"></i> Daftar Mentor
          </Link>
        </div>)}

      </ul>


    </aside>
  </div>)
}