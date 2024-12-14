import Image from "next/image";
import Link from "next/link";
import {CommonUtil} from "@/common/utils/common-util";

export default function AdminTopbar({parsedJwt}) {
  return (<nav className="navbar navbar-expand-lg main-navbar">
    <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`} className="navbar-brand sidebar-gone-hide">TENJIN</a>
    <div className="navbar-nav">
      <a href="#" className="nav-link sidebar-gone-show" data-toggle="sidebar"><i className="fas fa-bars"></i></a>
    </div>
    <div className="nav-collapse">
      <a className="sidebar-gone-show nav-collapse-toggle nav-link" href="#">
        <i className="fas fa-ellipsis-v"></i>
      </a>
    </div>
    <form className="form-inline ml-auto">
    </form>
    <ul className="navbar-nav navbar-right">
      <li className="dropdown"><a href="#" data-toggle="dropdown"
                                  className="nav-link dropdown-toggle nav-link-lg nav-link-user">
        <Image alt="image" width={35} height={35}
               src={parsedJwt?.photoPath === null ? '/assets/img/avatar/avatar-2.png' : `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${parsedJwt?.photoPath}`}
               className="rounded-circle mr-1" style={{
          width: '35px', height: '35px', objectFit: 'cover',
        }}/>
        <div className="d-sm-none d-lg-inline-block">Hi, {parsedJwt?.name}</div>
      </a>
        <div className="dropdown-menu dropdown-menu-right">
          <div className="dropdown-title">Logged
            in {parsedJwt && CommonUtil.diffForHumans((new Date(parsedJwt?.iat * 1000)))} min
            ago
          </div>
          <a href="features-profile.html" className="dropdown-item has-icon">
            <i className="far fa-user"></i> Profile
          </a>
          <Link href="/admin/settings/general-data" className="dropdown-item has-icon">
            <i className="fas fa-cog"></i> Settings
          </Link>
          <div className="dropdown-divider"></div>
          <a href="" className="dropdown-item has-icon text-danger" onClick={(e) => {
            e.preventDefault();
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            Cookies.remove('accessToken', {path: '/'}) // removed!
            window.location.reload();
          }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>)
}