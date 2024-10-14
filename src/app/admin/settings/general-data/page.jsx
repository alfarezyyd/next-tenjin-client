"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";

export default function Page() {
  useEffect(() => {
    const loadAssets = async () => {
      await CommonStyle();
      await CommonScript();
    }
    if (typeof window !== 'undefined') {
      loadAssets();
    }
  }, [])
  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <div className="section-header-back">
            <a href="features-settings.html" className="btn btn-icon"><i className="fas fa-arrow-left"></i></a>
          </div>
          <h1>General Settings</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
            <div className="breadcrumb-item active"><a href="#">Settings</a></div>
            <div className="breadcrumb-item">General Settings</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">All About General Settings</h2>
          <p className="section-lead">
            You can adjust all general settings here
          </p>

          <div id="output-status"></div>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h4>Jump To</h4>
                </div>
                <div className="card-body">
                  <ul className="nav nav-pills flex-column">
                    <li className="nav-item"><a href="#" className="nav-link active">General</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">SEO</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Email</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">System</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Security</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Automation</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <form id="general-data">
                <div className="card" id="settings-card">
                  <div className="card-header">
                    <h4>General Settings</h4>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">General settings such as, site title, site description, address and so
                      on.</p>
                    <div className="form-group row align-items-center">
                      <label htmlFor="site-title" className="form-control-label col-sm-3 text-md-right">Site
                        Title</label>
                      <div className="col-sm-6 col-md-9">
                        <input type="text" name="site_title" className="form-control" id="site-title"/>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AdminWrapper>
  )
}