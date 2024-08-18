"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({
    positionName: '',
    companyName: '',
    employmentType: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const loadAssets = async () => {
      await import('select2/dist/css/select2.min.css');
      await import('bootstrap-daterangepicker/daterangepicker.css');
      await import('filepond/dist/filepond.min.css');

      await import('select2/dist/js/select2.min');
      await import('bootstrap-daterangepicker/daterangepicker');
    };

    const initialPage = async () => {
      await fetchEmploymentTypeEnum()
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    initialPage();
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    form.delete('experienceResources');
    files.forEach((file, index) => {
      form.append(`experienceResources`, file.file);
    });

    form.append(`description`, typedText);

    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences`, {
      method: 'POST',
      body: form,
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      console.log('Data submitted successfully', responseBody);
      setErrors({});
    } else {
      console.error('Failed to submit data', responseBody);
      const errorMessages = {};
      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
      console.log(errorMessages);
    }
  };

  const fetchEmploymentTypeEnum = async () => {
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences/enums/employment-types`, {
      method: 'GET',
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });

    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      setEmploymentTypes(responseBody.data)
    } else {
      window.location.reload()
    }
  }

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <AdminWrapper>
          <section className="section">
            <div className="section-header">
              <h1>Pengalaman Mentor</h1>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item active">
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin`}>Application</a>
                </div>
                <div className="breadcrumb-item">
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/experiences`}>Pengalaman Mentor</a>
                </div>
                <div className="breadcrumb-item">Buat Data</div>
              </div>
            </div>

            <div className="section-body">
              <h2 className="section-title">Membuat Data Pengalaman Mentor Baru</h2>
              <p className="section-lead col-6">
                Pada halaman ini, Anda dapat membuat data pengalaman mentor baru dengan mengisi semua field formulir
                yang telah disediakan. Dengan pengalaman yang menarik, Anda dapat menarik mentee untuk belajar.
              </p>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Formulir Menambah Pengalaman Mentor Baru</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Posisi</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.positionName ? 'is-invalid' : ''}`}
                              name="positionName"
                              value={formData.positionName}
                              onChange={handleChange}
                            />
                            {errors.positionName && (
                              <div className="invalid-feedback">{errors.positionName}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Nama
                            Perusahaan</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                            />
                            {errors.companyName && (
                              <div className="invalid-feedback">{errors.companyName}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tipe
                            Employment</label>
                          <div className="col-sm-12 col-md-7">
                            <select className="form-control select2" onChange={handleChange} name="employmentType">
                              {employmentTypes.map((value, index, array) => {
                                return <option key={index} value={value}>{value}</option>
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Lokasi</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                            />
                            {errors.location && (
                              <div className="invalid-feedback">{errors.location}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal Mulai</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control datepicker ${errors.startDate ? 'is-invalid' : ''}`}
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                            />
                            {errors.startDate && (
                              <div className="invalid-feedback">{errors.startDate}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal
                            Selesai</label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control datepicker ${errors.endDate ? 'is-invalid' : ''}`}
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                            />
                            {errors.endDate && (
                              <div className="invalid-feedback">{errors.endDate}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Deskripsi</label>
                          <div className="col-sm-12 col-md-7">
                            <RichTextEditor setEditorData={setTypedText}/>
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Gambar</label>
                          <div className="col-sm-12 col-md-7">
                            <FilePond
                              files={files}
                              onupdatefiles={setFiles}
                              allowMultiple={true}
                              maxFiles={3}
                              name="experienceResources"
                              labelIdle='Seret & Letakkan Gambar Anda atau <span class="filepond--label-action">Browse</span>'
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                          <div className="col-sm-12 col-md-7">
                            <button className="btn btn-primary" type="submit">Publish</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AdminWrapper>
      )}
    </>
  );
}
