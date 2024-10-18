"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";

export default function Page() {
  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import('jquery')).default;
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
          <h1>Settings</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
            <div className="breadcrumb-item">Settings</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Overview</h2>
          <p className="section-lead">
            Organize and adjust all settings about this site.
          </p>

          <div className="row">
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-cog"></i>
                </div>
                <div className="card-body">
                  <h4>Informasi Pribadi</h4>
                  <p>Pengaturan mengenai data pribadi Anda yang harus dilengkapi sebelum melakukan order</p>
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/settings/general-data`} className="card-cta">Change
                    Setting <i
                      className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-search"></i>
                </div>
                <div className="card-body">
                  <h4>SEO</h4>
                  <p>Search engine optimization settings, such as meta tags and social media.</p>
                  <a href="features-setting-detail.html" className="card-cta">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="card-body">
                  <h4>Email</h4>
                  <p>Email SMTP settings, notifications and others related to email.</p>
                  <a href="features-setting-detail.html" className="card-cta">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-power-off"></i>
                </div>
                <div className="card-body">
                  <h4>System</h4>
                  <p>PHP version settings, time zones and other environments.</p>
                  <a href="features-setting-detail.html" className="card-cta">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="card-body">
                  <h4>Security</h4>
                  <p>Security settings such as firewalls, server accounts and others.</p>
                  <a href="features-setting-detail.html" className="card-cta">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-large-icons">
                <div className="card-icon bg-primary text-white">
                  <i className="fas fa-stopwatch"></i>
                </div>
                <div className="card-body">
                  <h4>Automation</h4>
                  <p>Settings about automation such as cron job, backup automation and so on.</p>
                  <a href="features-setting-detail.html" className="card-cta text-primary">Change Setting <i
                    className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminWrapper>
  )
}