"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useRef, useState} from "react";
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import {useParams, useRouter} from "next/navigation";
import {CommonUtil} from "@/common/utils/common-util";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function Page() {
  const [loading, setLoading] = useState(true);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [accessToken, setAccessToken] = useState();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  // Ref
  const employmentTypeRef = useRef(null)
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)
  const descriptionRef = useRef(null)
  const jQueryRef = useRef(null);

  const routerParam = useParams();

  const [formData, setFormData] = useState({
    positionName: '', companyName: '', location: '',
  });

  const [formDataRef, setFormDataRef] = useState({
    employmentType: '', startDate: '', endDate: '', description: '',
  });

  useEffect(() => {
    const loadAssets = async () => {
      await import('select2/dist/css/select2.min.css');
      await import('bootstrap-daterangepicker/daterangepicker.css');
      await import('filepond/dist/filepond.min.css');
      await import('summernote/dist/summernote-bs4.css');
      await CommonStyle();

      await import('select2/dist/js/select2.min');
      await import('bootstrap-daterangepicker/daterangepicker');
      await import('summernote/dist/summernote-bs4.js');
      await CommonScript();
      // Import jQuery
      const $ = (await import('jquery')).default;
      jQueryRef.current = $;

      $(employmentTypeRef.current).on("change", () => {
        setFormDataRef((prevFormDataRef) => ({
          ...prevFormDataRef, employmentType: ($(employmentTypeRef.current).val()),
        }));
      });

      function updateSelectedStartDate() {
        setFormDataRef((prevFormDataRef) => ({
          ...prevFormDataRef, startDate: ($(startDateRef.current).val()),
        }));
      }

      function updateSelectedEndDate() {
        setFormDataRef((prevFormDataRef) => ({
          ...prevFormDataRef, endDate: ($(endDateRef.current).val()),
        }));
      }

      $(startDateRef.current).on("apply.daterangepicker", updateSelectedStartDate);
      $(startDateRef.current).on("input", updateSelectedStartDate);

      $(endDateRef.current).on("apply.daterangepicker", updateSelectedEndDate);
      $(endDateRef.current).on("input", updateSelectedEndDate);

      $(descriptionRef.current).on("summernote.change", () => {
        setFormDataRef((prevFormDataRef) => ({
          ...prevFormDataRef, description: ($(descriptionRef.current).val()),
        }));
      });
    };


    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
      setAccessToken(Cookies.get('accessToken'));
    }

    return () => {
      // Cleanup: Destroy select2 when component unmounts or before reinitializing
      if (employmentTypeRef.current && jQueryRef.current) {
        jQueryRef.current(employmentTypeRef.current).select2('destroy'); // Hancurkan select2
      }
    };
  }, []);

  useEffect(() => {
    fetchEmploymentTypeEnum()
  }, [accessToken]);

  useEffect(() => {
    if (jQueryRef.current && employmentTypeRef.current) {
      const $ = jQueryRef.current;

      // Re-initialize select2 whenever component updates
      $(employmentTypeRef.current).select2(); // Pastikan hanya satu instance select2 yang aktif
    }
  });

  useEffect(() => {
    console.log(routerParam.id)
    if (routerParam.id) {
      const parsedJwt = CommonUtil.parseJwt(accessToken);
      fetchExistingExperiences(routerParam.id, parsedJwt)

    }
  }, [routerParam, accessToken])

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    Object.entries(formDataRef).forEach(([key, value]) => {
      form.append(key, value);
    });

    form.delete('experienceResources');
    files.forEach((file, index) => {
      form.append(`experienceResources`, file.file);
    });

    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }

    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences/${routerParam.id}`, {
      method: 'PUT', body: form, includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
      }
    });

    const responseBody = await fetchResponse.json();

    if (fetchResponse.ok) {
      setErrors({});
      router.push('/admin/mentor/experiences?notify=success'); // Tambahkan query param
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
    if (!accessToken) {
      return
    }
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences/enums/employment-types`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
      }
    });
    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      setEmploymentTypes(responseBody['result']['data'])
      setFormDataRef((prevFormDataRef) => ({
        ...prevFormDataRef, employmentType: responseBody['result']['data'][0],
      }))
    } else {
      console.error(responseBody);
    }
  }

  const fetchExistingExperiences = async (experienceId, parsedJwt) => {
    if (!accessToken) {
      return
    }
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences/${experienceId}`, {
      method: 'GET', includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
      }
    });
    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      const resultData = responseBody['result']['data'];
      setFormData({
        companyName: resultData.companyName, location: resultData.location, positionName: resultData.positionName,
      })
      setFormDataRef({
        employmentType: resultData.employmentType,
        startDate: resultData.startDate,
        endDate: resultData.endDate,
        description: resultData.description,
      })
      const allFiles = [];
      for (const resourceElement of resultData['experienceResource']) {
        allFiles.push({
          source: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/experience-resources/${parsedJwt.mentorId}/${experienceId}/${resourceElement.imagePath}`,
          options: {type: 'input'}
        });
      }
      setFiles(allFiles);

    } else {
      console.error(responseBody);
    }
  }

  return (<>
    {loading ? (<Loading/>) : (<AdminWrapper>
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
                        {errors.positionName && (<div className="invalid-feedback">{errors.positionName}</div>)}
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
                        {errors.companyName && (<div className="invalid-feedback">{errors.companyName}</div>)}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tipe
                        Employment</label>
                      <div className="col-sm-12 col-md-7">
                        <select className={`form-control select2 ${errors.employmentType ? 'is-invalid' : ''}`}
                                ref={employmentTypeRef} name="employmentType">
                          {employmentTypes !== undefined && employmentTypes.map((value, index, array) => {
                            return <option key={`employmentType-${index}`} value={value}
                                           defaultChecked={value === formDataRef.employmentType}>{value}</option>
                          })}
                        </select>
                        {errors.employmentType && (
                          <small className="invalid-feedback text-danger">{errors.employmentType}</small>)}
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
                        {errors.location && (<div className="invalid-feedback">{errors.location}</div>)}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal Mulai</label>
                      <div className="col-sm-12 col-md-7">
                        <input
                          type="text"
                          ref={startDateRef}
                          className={`form-control datepicker ${errors.startDate ? 'is-invalid' : ''}`}
                          name="startDate"
                          defaultValue={formDataRef.startDate}
                        />
                        {errors.startDate && (<div className="invalid-feedback">{errors.startDate}</div>)}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tanggal
                        Selesai</label>
                      <div className="col-sm-12 col-md-7">
                        <input
                          type="text"
                          ref={endDateRef}
                          className={`form-control datepicker ${errors.endDate ? 'is-invalid' : ''}`}
                          name="endDate"
                          defaultValue={formDataRef.endDate}
                        />
                        {errors.endDate && (<div className="invalid-feedback">{errors.endDate}</div>)}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                             htmlFor="description">Deskripsi</label>
                      <div className="col-sm-12 col-md-7">
                            <textarea ref={descriptionRef}
                                      className={`summernote-simple ${errors.description ? 'is-invalid' : ''}`}
                                      name="description" id="description" defaultValue={formDataRef.description}
                            ></textarea>
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
    </AdminWrapper>)}
  </>);
}