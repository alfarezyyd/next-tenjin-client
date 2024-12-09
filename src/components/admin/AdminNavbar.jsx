import Cookies from "js-cookie";
import Link from "next/link";
import {CommonUtil} from "@/common/utils/common-util";
import Image from "next/image";

export default function AdminNavbar({parsedJwt}) {
  return (<nav className="navbar navbar-expand-lg main-navbar">
    <form className="form-inline mr-auto">
      <ul className="navbar-nav mr-3">
        <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a>
        </li>
        <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i
          className="fas fa-search"></i></a></li>
      </ul>
    </form>
    <ul className="navbar-nav navbar-right">
      {/*<li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"*/}
      {/*                                                 className="nav-link nav-link-lg message-toggle beep"><i*/}
      {/*  className="far fa-envelope"></i></a>*/}
      {/*  <div className="dropdown-menu dropdown-list dropdown-menu-right">*/}
      {/*    <div className="dropdown-header">Messages*/}
      {/*      <div className="float-right">*/}
      {/*        <a href="#">Mark All As Read</a>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="dropdown-list-content dropdown-list-message">*/}
      {/*      <a href="#" className="dropdown-item dropdown-item-unread">*/}
      {/*        <div className="dropdown-item-avatar">*/}
      {/*          <Image alt="image" width={0} height={0}*/}
      {/*                 className="rounded-circle"/>*/}
      {/*          <div className="is-online"></div>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>Kusnaedi</b>*/}
      {/*          <p>Hello, Bro!</p>*/}
      {/*          <div className="time">10 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item dropdown-item-unread">*/}
      {/*        <div className="dropdown-item-avatar">*/}
      {/*          <Image width={0} height={0} alt="image" src="/assets/img/avatar/avatar-2.png"*/}
      {/*                 className="rounded-circle"/>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>Dedik Sugiharto</b>*/}
      {/*          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>*/}
      {/*          <div className="time">12 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item dropdown-item-unread">*/}
      {/*        <div className="dropdown-item-avatar">*/}
      {/*          <Image alt="image" src="/assets/img/avatar/avatar-3.png" className="rounded-circle"/>*/}
      {/*          <div className="is-online"></div>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>Agung Ardiansyah</b>*/}
      {/*          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
      {/*          <div className="time">12 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item">*/}
      {/*        <div className="dropdown-item-avatar">*/}
      {/*          <Image alt="image" src="/assets/img/avatar/avatar-4.png" className="rounded-circle"/>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>Ardian Rahardiansyah</b>*/}
      {/*          <p>Duis aute irure dolor in reprehenderit in voluptate velit ess</p>*/}
      {/*          <div className="time">16 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item">*/}
      {/*        <div className="dropdown-item-avatar">*/}
      {/*          <Image alt="image" src="/assets/img/avatar/avatar-5.png" className="rounded-circle"/>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>Alfa Zulkarnain</b>*/}
      {/*          <p>Exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>*/}
      {/*          <div className="time">Yesterday</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*    <div className="dropdown-footer text-center">*/}
      {/*      <a href="#">View All <i className="fas fa-chevron-right"></i></a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</li>*/}
      {/*<li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"*/}
      {/*                                                 className="nav-link notification-toggle nav-link-lg beep"><i*/}
      {/*  className="far fa-bell"></i></a>*/}
      {/*  <div className="dropdown-menu dropdown-list dropdown-menu-right">*/}
      {/*    <div className="dropdown-header">Notifications*/}
      {/*      <div className="float-right">*/}
      {/*        <a href="#">Mark All As Read</a>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="dropdown-list-content dropdown-list-icons">*/}
      {/*      <a href="#" className="dropdown-item dropdown-item-unread">*/}
      {/*        <div className="dropdown-item-icon bg-primary text-white">*/}
      {/*          <i className="fas fa-code"></i>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          Template update is available now!*/}
      {/*          <div className="time text-primary">2 Min Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item">*/}
      {/*        <div className="dropdown-item-icon bg-info text-white">*/}
      {/*          <i className="far fa-user"></i>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>You</b> and <b>Dedik Sugiharto</b> are now friends*/}
      {/*          <div className="time">10 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item">*/}
      {/*        <div className="dropdown-item-icon bg-success text-white">*/}
      {/*          <i className="fas fa-check"></i>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>*/}
      {/*          <div className="time">12 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item">*/}
      {/*        <div className="dropdown-item-icon bg-danger text-white">*/}
      {/*          <i className="fas fa-exclamation-triangle"></i>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          Low disk space. Lets clean it!*/}
      {/*          <div className="time">17 Hours Ago</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*      <a href="#" className="dropdown-item">*/}
      {/*        <div className="dropdown-item-icon bg-info text-white">*/}
      {/*          <i className="fas fa-bell"></i>*/}
      {/*        </div>*/}
      {/*        <div className="dropdown-item-desc">*/}
      {/*          Welcome to Stisla template!*/}
      {/*          <div className="time">Yesterday</div>*/}
      {/*        </div>*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*    <div className="dropdown-footer text-center">*/}
      {/*      <a href="#">View All <i className="fas fa-chevron-right"></i></a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</li>*/}
      <li className="dropdown"><a href="#" data-toggle="dropdown"
                                  className="nav-link dropdown-toggle nav-link-lg nav-link-user">
        <Image alt="image" width={0} height={0}
               src={parsedJwt?.photoPath === undefined || parsedJwt?.photoPath === null ? '/assets/img/avatar/avatar-2.png' : `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${parsedJwt?.photoPath}`}
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