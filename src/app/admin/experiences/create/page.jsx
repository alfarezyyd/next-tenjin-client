"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect} from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {ClassicEditor} from "ckeditor5";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function Page() {
  useEffect(() => {
    const loadAssets = async () => {
      await import('select2/dist/css/select2.min.css');
      await import('bootstrap-daterangepicker/daterangepicker.css')

      await import('select2/dist/js/select2.min')
      await import('bootstrap-daterangepicker/daterangepicker')
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
  })

  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Editor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
            <div className="breadcrumb-item"><a href="#">Forms</a></div>
            <div className="breadcrumb-item">Editor</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Editor</h2>
          <p className="section-lead">WYSIWYG editor and code editor.</p>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Simple Summernote</h4>
                </div>
                <div className="card-body">
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Posisi</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Nama Perusahaan</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tipe Employment</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Lokasi</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal Mulai</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control datepicker"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal Selesai</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control datepicker"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Deskripsi</label>
                    <div className="col-sm-12 col-md-7">
                      <RichTextEditor/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                    <div className="col-sm-12 col-md-7">
                      <button className="btn btn-primary">Publish</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </AdminWrapper>
  );
}
