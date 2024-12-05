"use client";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loading} from "@/components/admin/Loading";
import AdminWrapper from "@/components/admin/AdminWrapper";

import CommonScript from "@/components/admin/CommonScript";
import {FilePond, registerPlugin} from "react-filepond";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {useParams, useRouter} from "next/navigation";


import 'select2/dist/css/select2.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'summernote/dist/summernote-bs4.css';
import 'filepond/dist/filepond.min.css';
import '@/../public/assets/css/components.css'
import {toast} from "react-toastify";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [assistanceDependency, setAssistanceDependency] = useState({
    categories: [], tags: [], languages: [],
  });
  const router = useRouter();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [accessToken, setAccessToken] = useState();
  const [filteredTags, setFilteredTags] = useState([]);
  const [existingAssistance, setExistingAssistance] = useState();
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    durationMinutes: '',
    price: '',
    format: 'INDIVIDUAL',
    capacity: '',
    languages: [],
    tagId: [],
    deletedFilesName: []
  });

  const [errors, setErrors] = useState({});
  const categorySelectRef = useRef(null);
  const tagsSelectRef = useRef(null);
  const descriptionRef = useRef(null);
  const languagesSelectRef = useRef(null);
  const formatSelectRef = useRef(null);

  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import('jquery')).default;
      window.jQuery = $
      await import('select2/dist/js/select2.min');
      await import('bootstrap-daterangepicker/daterangepicker');
      if (!$.fn.summernote) {
        await import('summernote/dist/summernote-bs4.js');
      }
      await CommonScript();
      $(categorySelectRef.current).on("change", () => {
        setSelectedCategoryId($(categorySelectRef.current).val());
      });
      $(tagsSelectRef.current).on("change", () => {
        const selectedValues = $(tagsSelectRef.current).val(); // Menghasilkan array
        setFormData((prev) => ({
          ...prev,
          tagId: [...new Set([...prev.tagId, ...selectedValues.map(Number)])], // Gabungkan & hilangkan duplikat
        }));
      });

      $(languagesSelectRef.current).on("change", () => {
        const selectedValues = $(languagesSelectRef.current).val(); // Menghasilkan array
        setFormData((prev) => ({
          ...prev,
          languages: [...new Set([...prev.languages, ...selectedValues.map(Number)])], // Gabungkan & hilangkan duplikat
        }));
      });
      $(formatSelectRef.current).on("change", () => {
        setFormData(prev => ({
          ...prev, format: $(formatSelectRef.current).val()
        }));
      })
      $(descriptionRef.current).on("summernote.change", () => {
        setFormData(prev => ({
          ...prev, description: $(descriptionRef.current).val()
        }));
      })
    };

    if (typeof window !== 'undefined') {
      loadAssets();
    }
  }, []);

  useEffect(() => {
    setAccessToken(Cookies.get('accessToken'));
    fetchAssistanceDependency();
  }, [accessToken]);


  useEffect(() => {
    const updateSelect2 = async () => {
      if (typeof window !== 'undefined' && window.jQuery !== undefined) {
        const $ = window.jQuery;
        if (typeof $.fn.select2 === 'function') {

          // Hapus elemen select jika sudah ada
          if (tagsSelectRef.current) {
            tagsSelectRef.current.remove();
          }

          if ($(tagsSelectRef.current).data('select2')) {
            $(tagsSelectRef.current).select2('destroy');
          }
          // Buat elemen select baru
          const newSelectElement = document.createElement('select');
          newSelectElement.className = 'form-control select2';
          newSelectElement.multiple = true;
          newSelectElement.name = 'tags';
          document.getElementById('select-container').appendChild(newSelectElement);

          // Set ref ke elemen baru
          tagsSelectRef.current = newSelectElement;
          // Tambahkan option ke elemen select
          filteredTags.forEach(tag => {
            const optionElement = new Option(tag.name, tag.id);
            newSelectElement.appendChild(optionElement);
          });

          // Inisialisasi select2
          $(tagsSelectRef.current).select2()
          $(tagsSelectRef.current).on("change", () => {
            const selectedValues = $(tagsSelectRef.current).val(); // Menghasilkan array
            setFormData((prev) => ({
              ...prev,
              tagId: [...new Set([...prev.tagId, ...selectedValues.map(Number)])], // Gabungkan & hilangkan duplikat
            }));
          });
        }
      }
    };

    updateSelect2();
  }, [filteredTags]);

  useEffect(() => {
    if (assistanceDependency.tags && existingAssistance?.category?.id) {
      setFilteredTags(assistanceDependency.tags.filter(tag => tag.categoryId === existingAssistance.category.id))
    }
  }, [assistanceDependency.tags, existingAssistance])

  const fetchAssistanceDependency = async () => {
    setLoading(true);
    if (accessToken) {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/assistants/create`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`
        }
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setAssistanceDependency(responseBody['result']['data']);
        setFormData({...formData, languages: responseBody['result']['data']['languages'].map(language => language.id)});
      } else {
        console.error('Failed to fetch assistance dependency', responseBody);
      }
      setLoading(false)
    }
  };

  useEffect(() => {
    if (selectedCategoryId) {
      setFormData({
        ...formData, tagId: []
      })
      const newFilteredTag = assistanceDependency.tags.filter(tag => tag.categoryId == selectedCategoryId)
      setFilteredTags(newFilteredTag)
    }
  }, [selectedCategoryId]);

  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFormData(prevFormData => ({
      ...prevFormData, [name]: value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataPayload = new FormData();
    const updatedFiles = files.filter(file => !oldFiles.some(oldFile => oldFile.name.imagePath === file.file.name));
    updatedFiles.forEach((file, index) => {
      formDataPayload.append(`images`, file.file);
    });
    console.log(formData)
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Jika value adalah array, iterasi dan append setiap elemennya
        value.forEach((item) => {
          formDataPayload.append(`${key}[]`, item); // Tambahkan [] untuk array format
        });
      } else {
        // Jika value bukan array, langsung append
        formDataPayload.append(key, value);
      }
    });

    formDataPayload.append('categoryId', selectedCategoryId === 0 ? existingAssistance.category.id : selectedCategoryId);
    formDataPayload.forEach((value, key) => {
      console.log(key, value);
    })
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/assistants/${existingAssistance.id}`, {
      method: 'PUT', body: formDataPayload, includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
      }
    });

    const responseBody = await response.json();

    if (response.ok) {
      setErrors({});
      router.push('/admin/mentor/assistants?notify=success');
    } else {
      console.error('Failed to submit data', responseBody);
      try {
        const errorMessages = {};
        responseBody.errors.message.forEach((error) => {
          errorMessages[error.path[0]] = error.message;
        });
        setErrors(errorMessages);
      } catch (e) {
        toast.error('Anda sudah memiliki kelas asistensi untuk kategori ini!')
      }
    }
  }

  const fetchExistingAssistance = async (id) => {
    setLoading(true);
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/assistants/${id}`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });

        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          const existingAssistance = responseBody.result.data;
          console.log(existingAssistance)
          setFormData({
            topic: existingAssistance.topic,
            capacity: existingAssistance.capacity,
            price: existingAssistance.price,
            durationMinutes: existingAssistance.durationMinutes,
            description: existingAssistance.description,
            tagId: [...existingAssistance.AssistanceTag.map((tag) => tag.tagId)],
            languages: [...existingAssistance.AssistanceLanguage.map((langauge) => langauge.languageId)],
            format: existingAssistance.format,
            deletedFilesName: []
          })
          const allFiles = [];
          existingAssistance.AssistanceResource.forEach(image => {
            allFiles.push({
              source: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/assistants/${existingAssistance.mentorId}/${existingAssistance.id}/${image.imagePath}`,
              options: {type: 'input'},
              name: image
            })
          })
          setFiles(allFiles);
          setOldFiles(allFiles);
          setExistingAssistance(existingAssistance)
        } else {
          console.error('Failed to fetch experiences', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  useEffect(() => {
    const loadExistingFormDataRef = async () => {
      const $ = (await import('jquery')).default;
      $(categorySelectRef.current).val(existingAssistance.categoryId)
      $(formatSelectRef.current).val(existingAssistance.format)
      const languageId = existingAssistance.AssistanceLanguage.map(language => language.languageId)
      $(languagesSelectRef.current).val(languageId).trigger('change');
    }
    if (existingAssistance && assistanceDependency) {
      loadExistingFormDataRef();
    }
  }, [existingAssistance]);

  useEffect(() => {
    const updateTagsSelect = async () => {
      if (existingAssistance && filteredTags && window.jQuery) {
        const $ = window.jQuery
        const validTagIds = existingAssistance.AssistanceTag.map(item => item.tagId);
        const filteredData = filteredTags.filter(item => validTagIds.includes(item.id)).map((tag) => tag.id);
        console.log(filteredData);
        $(tagsSelectRef.current).val(filteredData).trigger('change'); // Set default value
      }
    }
    updateTagsSelect();
  }, [existingAssistance, filteredTags]);

  useEffect(() => {
    if (params.id) {
      fetchExistingAssistance(params.id);
    }
  }, [params.id, accessToken]);


  const errorFeedback = useMemo(() => ({
    topic: errors.topic ? <div className="invalid-feedback">{errors.topic}</div> : null,
    durationMinutes: errors.durationMinutes ? <div className="invalid-feedback">{errors.durationMinutes}</div> : null,
    price: errors.price ? <div className="invalid-feedback">{errors.price}</div> : null,
    capacity: errors.capacity ? <div className="invalid-feedback">{errors.capacity}</div> : null,
    languages: errors.languages ? <small className="text-danger">{errors.languages}</small> : null,
    format: errors.format ? <small className="text-danger">{errors.format}</small> : null,
    tagId: errors.tagId ? <small className="text-danger">{errors.tagId}</small> : null,
    description: errors.description ? <small className="text-danger">{errors.description}</small> : null,
  }), [errors]);

  async function handleRemoveFile(error, file) {
    setFormData((prevFormData) => ({
      ...prevFormData, deletedFilesName: [...formData.deletedFilesName, file.file.name]
    }))
  }

  return (<>
    {loading ? (<Loading/>) : (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Pendidikan Mentor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin`}>Application</a>
            </div>
            <div className="breadcrumb-item">
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/experiences`}>Pendidikan Mentor</a>
            </div>
            <div className="breadcrumb-item">Buat Data</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Membuat Data Pendidikan Mentor Baru</h2>
          <p className="section-lead col-6">
            Pada halaman ini, Anda dapat membuat data pendidikan mentor baru dengan mengisi semua field formulir
            yang telah disediakan. Dengan jejak edukasi yang memukau, Anda dapat menarik mentee untuk belajar.
          </p>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>Formulir Menambah Pendidikan Mentor Baru</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="categoryId">
                        Kategori Asistensi
                      </label>
                      <div className="col-sm-12 col-md-7">
                        <select ref={categorySelectRef} className="form-control select2"
                                name="categoryId" id="categoryId">
                          {assistanceDependency['categories'].map((value, index) => (
                            <option key={index} value={Number(value['id'])}>{value['name']}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="topic">
                        Topik
                      </label>
                      <div className="col-sm-12 col-md-7">
                        <input
                          type="text"
                          className={`form-control ${errors.topic ? 'is-invalid' : ''}`}
                          name="topic"
                          id="topic"
                          value={formData.topic}
                          onChange={handleChange}
                        />
                        {errorFeedback.topic}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                             htmlFor="durationMinutes">
                        Durasi
                      </label>
                      <div className="col-sm-8 col-md-5 input-group">
                        <input
                          type="number"
                          className={`form-control ${errors.durationMinutes ? 'is-invalid' : ''}`}
                          name="durationMinutes"
                          id="durationMinutes"
                          value={formData.durationMinutes}
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            Menit
                          </div>
                        </div>
                        {errorFeedback.durationMinutes}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                             htmlFor="price">
                        Harga
                      </label>
                      <div className="col-sm-8 col-md-5 input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            Rupiah
                          </div>
                        </div>
                        <input
                          type="number"
                          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                          name="price"
                          id="price"
                          value={formData.price}
                          onChange={handleChange}
                        />
                        {errorFeedback.price}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                             htmlFor="capacity">
                        Kapasitas
                      </label>
                      <div className="col-sm-9 col-md-5 input-group">
                        <input
                          type="number"
                          className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                          name="capacity"
                          id="capacity"
                          value={formData.capacity}
                          onChange={handleChange}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            Orang
                          </div>
                        </div>
                        {errorFeedback.capacity}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="format">
                        Format Asistensi
                      </label>
                      <div className="col-sm-12 col-md-7">
                        <select ref={formatSelectRef} className="form-control select2"
                                name="format" id="format">
                          <option key="INDIVIDUAL" value="INDIVIDUAL">INDIVIDUAL
                          </option>
                          <option key="GROUP" value="GROUP">GROUP</option>
                          <option key="HYBRID" value="HYBRID">HYBRID</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="tags">
                        Tag
                      </label>
                      <div className="col-sm-12 col-md-7" id="select-container">
                        <select
                          ref={tagsSelectRef} className={`form-control select2 ${errors.tagId ? 'is-invalid' : ''}`}
                          multiple={true}
                          onChange={handleChange}
                          name="tagId" id="tags">
                          {filteredTags.length !== 0 && filteredTags.map((tag, index) => (
                            <option key={`tags-${index}`} value={tag['id']}>{tag['name']}</option>))}
                        </select>
                        {errorFeedback.tagId}
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3" htmlFor="languages">
                        Bahasa
                      </label>
                      <div className="col-sm-12 col-md-7">
                        <select className="form-control select2" multiple={true} ref={languagesSelectRef}
                                name="languages" id="languages">
                          {assistanceDependency['languages'].map((value, index) => (
                            <option key={"languages" + index} value={value['id']}>{value['name']}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"
                             htmlFor="description">Deskripsi</label>
                      <div className="col-sm-12 col-md-7">
                            <textarea className={`summernote-simple ${errors.capacity ? 'is-invalid' : ''}`}
                                      name="description" id="description" ref={descriptionRef}
                                      defaultValue={formData.description}></textarea>
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Gambar</label>
                      <div className="col-sm-12 col-md-7">
                        <FilePond
                          files={files}
                          onupdatefiles={setFiles}
                          onremovefile={handleRemoveFile}
                          allowMultiple={true}
                          maxFiles={3}
                          name="assistanceResources"
                          labelIdle='Seret & Letakkan Gambar Anda atau <span class="filepond--label-action">Browse</span>'
                        />
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
    </AdminWrapper>)}
  </>);
}
