"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import BundledEditor from "@/components/admin/BundledEditor";


export default function Page() {
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
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Title</label>
                    <div className="col-sm-12 col-md-7">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Category</label>
                    <div className="col-sm-12 col-md-7">
                      <select className="form-control selectric">
                        <option>Tech</option>
                        <option>News</option>
                        <option>Political</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mb-4">
                    <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Content</label>
                    <div className="col-sm-12 col-md-7">
                      <BundledEditor
                        initialValue='<p>This is the initial content of the editor.</p>'
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                            'searchreplace', 'table', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
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