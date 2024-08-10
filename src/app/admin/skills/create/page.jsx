"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState, useCallback, useMemo} from "react";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadAssets = async () => {
      await import('select2/dist/css/select2.min.css');

      await import('select2/dist/js/select2.min');
    };

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    setLoading(false);
  }, []);

  // useCallback to memoize handleChange function
  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  // useCallback to memoize handleSubmit function
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const form = new FormData();

    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/educations`, {
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
  }, [formData]);

  // useMemo to memoize validation errors display logic
  const errorFeedback = useMemo(() => {
    return {
      name: errors.name ? <div className="invalid-feedback">{errors.name}</div> : null,
      description: errors.description ? <small className="text-danger">{errors.description}</small> : null,
    };
  }, [errors]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <AdminWrapper>
          <section className="section">
            <div className="section-header">
              <h1>Kemampuan Mentor</h1>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item active">
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin`}>Application</a>
                </div>
                <div className="breadcrumb-item">
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/experiences`}>Kemampuan Mentor</a>
                </div>
                <div className="breadcrumb-item">Buat Data</div>
              </div>
            </div>

            <div className="section-body">
              <h2 className="section-title">Membuat Data Kemampuan Mentor Baru</h2>
              <p className="section-lead col-6">
                Pada halaman ini, Anda dapat membuat data kemampuan mentor baru dengan mengisi semua field formulir
                yang telah disediakan. Dengan kemampuan yang variatif, Anda dapat menarik mentee untuk belajar.
              </p>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Formulir Menambah Kemampuan Mentor Baru</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="name">
                            Nama Kemampuan
                          </label>
                          <div className="col-sm-12 col-md-7">
                            <input
                              type="text"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                            {errorFeedback.name}
                          </div>
                        </div>
                        <div className="form-group row mb-4">
                          <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                                 form="description">Deskripsi</label>
                          <div className="col-sm-12 col-md-7">
                            <RichTextEditor setEditorData={(data) => setFormData((prevFormData) => ({
                              ...prevFormData,
                              description: data
                            }))}/>
                            {errorFeedback.description}
                          </div>
                        </div>

                        <div className="form-group row mb-4">
                          <div className="col-sm-12 col-md-7 offset-md-3">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
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

