"use client"
import {useEffect, useState} from "react";
import {Loading} from "@/components/admin/Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import "../../../public/assets/css/custom.scss"
import CommonScript from "@/components/admin/CommonScript";
import CommonStyle from "@/components/admin/CommonStyle";

export default function AdminFullWrapper({children}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.classList.add('layout-3'); // Tambahkan class layout-3
    const loadAssets = async () => {
      await CommonStyle()
      const jQueryModule = await import('jquery');
      window.jQuery = jQueryModule.default; // Also assign jQuery to window object
      await import('jquery-ui-dist/jquery-ui.min');
      await import('popper.js/dist/popper');
      await import('bootstrap/dist/js/bootstrap');
      await import('moment/moment');
      await import('tooltip.js/dist/tooltip.min');
      await CommonScript()
    };

    if (typeof window !== "undefined") {
      loadAssets();
      setLoading(false);
    }

    return () => {
      // Bersihkan class saat komponen di-unmount
      document.body.classList.remove('layout-3');
    };
  }, []);


  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div id="app">
          <div className="main-wrapper container">
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
              <a href="index.html" className="navbar-brand sidebar-gone-hide">Stisla</a>
              <div className="navbar-nav">
                <a href="#" className="nav-link sidebar-gone-show" data-toggle="sidebar"><i className="fas fa-bars"></i></a>
              </div>
              <div className="nav-collapse">
                <a className="sidebar-gone-show nav-collapse-toggle nav-link" href="#">
                  <i className="fas fa-ellipsis-v"></i>
                </a>
                <ul className="navbar-nav">
                  <li className="nav-item active"><a href="#" className="nav-link">Application</a></li>
                  <li className="nav-item"><a href="#" className="nav-link">Report Something</a></li>
                  <li className="nav-item"><a href="#" className="nav-link">Server Status</a></li>
                </ul>
              </div>
              <form className="form-inline ml-auto">
              </form>
              <ul className="navbar-nav navbar-right">
                <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
                                                                 className="nav-link nav-link-lg message-toggle beep"><i
                  className="far fa-envelope"></i></a>
                  <div className="dropdown-menu dropdown-list dropdown-menu-right">
                    <div className="dropdown-header">Messages
                      <div className="float-right">
                        <a href="#">Mark All As Read</a>
                      </div>
                    </div>
                    <div className="dropdown-list-content dropdown-list-message">
                      <a href="#" className="dropdown-item dropdown-item-unread">
                        <div className="dropdown-item-avatar">
                          <img alt="image" src="../assets/img/avatar/avatar-1.png" className="rounded-circle"/>
                          <div className="is-online"></div>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>Kusnaedi</b>
                          <p>Hello, Bro!</p>
                          <div className="time">10 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item dropdown-item-unread">
                        <div className="dropdown-item-avatar">
                          <img alt="image" src="../assets/img/avatar/avatar-2.png" className="rounded-circle"/>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>Dedik Sugiharto</b>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <div className="time">12 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item dropdown-item-unread">
                        <div className="dropdown-item-avatar">
                          <img alt="image" src="../assets/img/avatar/avatar-3.png" className="rounded-circle"/>
                          <div className="is-online"></div>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>Agung Ardiansyah</b>
                          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                          <div className="time">12 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <div className="dropdown-item-avatar">
                          <img alt="image" src="../assets/img/avatar/avatar-4.png" className="rounded-circle"/>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>Ardian Rahardiansyah</b>
                          <p>Duis aute irure dolor in reprehenderit in voluptate velit ess</p>
                          <div className="time">16 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <div className="dropdown-item-avatar">
                          <img alt="image" src="../assets/img/avatar/avatar-5.png" className="rounded-circle"/>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>Alfa Zulkarnain</b>
                          <p>Exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                          <div className="time">Yesterday</div>
                        </div>
                      </a>
                    </div>
                    <div className="dropdown-footer text-center">
                      <a href="#">View All <i className="fas fa-chevron-right"></i></a>
                    </div>
                  </div>
                </li>
                <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
                                                                 className="nav-link notification-toggle nav-link-lg beep"><i
                  className="far fa-bell"></i></a>
                  <div className="dropdown-menu dropdown-list dropdown-menu-right">
                    <div className="dropdown-header">Notifications
                      <div className="float-right">
                        <a href="#">Mark All As Read</a>
                      </div>
                    </div>
                    <div className="dropdown-list-content dropdown-list-icons">
                      <a href="#" className="dropdown-item dropdown-item-unread">
                        <div className="dropdown-item-icon bg-primary text-white">
                          <i className="fas fa-code"></i>
                        </div>
                        <div className="dropdown-item-desc">
                          Template update is available now!
                          <div className="time text-primary">2 Min Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <div className="dropdown-item-icon bg-info text-white">
                          <i className="far fa-user"></i>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                          <div className="time">10 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <div className="dropdown-item-icon bg-success text-white">
                          <i className="fas fa-check"></i>
                        </div>
                        <div className="dropdown-item-desc">
                          <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>
                          <div className="time">12 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <div className="dropdown-item-icon bg-danger text-white">
                          <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="dropdown-item-desc">
                          Low disk space. Lets clean it!
                          <div className="time">17 Hours Ago</div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item">
                        <div className="dropdown-item-icon bg-info text-white">
                          <i className="fas fa-bell"></i>
                        </div>
                        <div className="dropdown-item-desc">
                          Welcome to Stisla template!
                          <div className="time">Yesterday</div>
                        </div>
                      </a>
                    </div>
                    <div className="dropdown-footer text-center">
                      <a href="#">View All <i className="fas fa-chevron-right"></i></a>
                    </div>
                  </div>
                </li>
                <li className="dropdown"><a href="#" data-toggle="dropdown"
                                            className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                  <img alt="image" src="../assets/img/avatar/avatar-1.png" className="rounded-circle mr-1"/>
                  <div className="d-sm-none d-lg-inline-block">Hi, Ujang Maman</div>
                </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-title">Logged in 5 min ago</div>
                    <a href="features-profile.html" className="dropdown-item has-icon">
                      <i className="far fa-user"></i> Profile
                    </a>
                    <a href="features-activities.html" className="dropdown-item has-icon">
                      <i className="fas fa-bolt"></i> Activities
                    </a>
                    <a href="features-settings.html" className="dropdown-item has-icon">
                      <i className="fas fa-cog"></i> Settings
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item has-icon text-danger">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            
            <div className="main-content">
              <section className="section">
                <div className="section-header">
                  <h1>Top Navigation</h1>
                  <div className="section-header-breadcrumb">
                    <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
                    <div className="breadcrumb-item"><a href="#">Layout</a></div>
                    <div className="breadcrumb-item">Top Navigation</div>
                  </div>
                </div>

                <div className="section-body">
                  <h2 className="section-title">This is Example Page</h2>
                  <p className="section-lead">This page is just an example for you to create your own page.</p>
                  <div className="card">
                    <div className="card-header">
                      <h4>Example Card</h4>
                    </div>
                    <div className="card-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="card-footer bg-whitesmoke">
                      This is card footer
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <footer className="main-footer">
              <div className="footer-left">
                Copyright &copy; 2018 <div className="bullet"></div> Design By <a href="https://nauv.al/">Muhamad Nauval
                Azhar</a>
              </div>
              <div className="footer-right">
                2.3.0
              </div>
            </footer>
          </div>
        </div>
      )
      }
    </>
  )
}