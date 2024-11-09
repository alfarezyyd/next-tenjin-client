"use client";
import AdminFullWrapper from "@/components/admin/AdminFullWrapper";
import {useEffect, useState} from "react";
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import CommonStyle from "@/components/admin/CommonStyle";
import {Loading} from "@/components/admin/Loading";
import CommonScript from "@/components/admin/CommonScript";
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // State untuk mengelola langkah wizard
  const [loggedUser, setLoggedUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState([]);
  const [identityCard, setIdentityCard] = useState();
  const [curriculumVitae, setCurriculumVitae] = useState();
  const [formData, setFormData] = useState({
    mentorAddress: {
      street: "",
      village: "",
      neighbourhoodNumber: "",
      hamletNumber: "",
      urbanVillage: "",
      subDistrict: "",
      district: "",
      province: "",
    }, pin: "", mentorBankAccount: {
      accountHolderName: "", bankName: "", accountNumber: "", paymentRecipientEmail: "",
    }
  });
  const [errors, setErrors] = useState({});
  const router = useRouter()

  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import("jquery")).default;
      await import('filepond/dist/filepond.min.css');
      await CommonStyle();
      await CommonScript();
    };

    if (typeof window !== "undefined") {
      loadAssets();
      fetchCurrentUser();
      setLoading(false);
    }

  }, []);

  const fetchCurrentUser = async () => {
    let accessToken = Cookies.get("accessToken");
    const user = CommonUtil.parseJwt(accessToken);
    setLoggedUser(user);
  };

  function handleFileBrowser(event) {
    let fieldVal = event.target.value;
    fieldVal = fieldVal.replace("C:\\fakepath\\", "");

    if (fieldVal) {
      // Set the label's text using the DOM API
      event.target.nextSibling.setAttribute('data-content', fieldVal);
      event.target.nextSibling.textContent = fieldVal;
    }
  }

  // Fungsi untuk mengubah nilai form
  const handleChange = (e, objectName) => {
    const {name, value} = e.target;
    const setInner = () => {
      setFormData((prevData) => ({
        ...prevData, [objectName]: {
          ...prevData[objectName], [name]: value,
        }
      }));
    }

    function setOuter() {
      setFormData((prevData) => ({
        ...prevData, [name]: value,
      }));
    }

    objectName !== undefined ? setInner() : setOuter();
  };

  // Fungsi untuk mengirim form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Looping untuk setiap properti dalam object
    const convertIntoFormData = (data, form = new FormData(), parentKey = '') => {
      // Looping untuk setiap properti dalam object
      for (const formDataKey in data) {
        if (data.hasOwnProperty(formDataKey)) {
          const value = data[formDataKey];

          // Cek apakah value adalah object (dan bukan file atau null)
          if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            // Jika object, maka lakukan rekursif dengan parentKey
            convertIntoFormData(value, form, parentKey ? `${parentKey}[${formDataKey}]` : formDataKey);
          } else {
            // Jika bukan object (atau berupa file), langsung append ke FormData
            const finalKey = parentKey ? `${parentKey}[${formDataKey}]` : formDataKey;
            form.append(finalKey, value);
          }
        }
      }

      return form;
    };
    const formDataPayload = convertIntoFormData(formData);
    console.log(profilePhoto[0]);
    formDataPayload.append("photo", profilePhoto[0].file);
    formDataPayload.append("identityCard", identityCard);
    formDataPayload.append("curriculumVitae", curriculumVitae);
    for (var pair of formDataPayload.entries()) {
      console.log(pair[0], pair[1]);
    }
    const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors`, {
      method: 'POST', body: formDataPayload, includeCredentials: true, headers: {
        'Accept': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    })
    const responseBody = await fetchResponse.json();
    if (fetchResponse.ok) {
      router.push('/admin/educations?notify=success'); // Tambahkan query param
    } else {
      setCurrentStep(1);
      const errorMessages = {};
      setFormData((prevData) => ({
        ...prevData, photo: null,
      }));

      responseBody.errors.message.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    }
  };

  // Fungsi untuk navigasi ke langkah berikutnya
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Fungsi untuk kembali ke langkah sebelumnya
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (<>
    {loading ? <Loading/> : (<AdminFullWrapper>
      <section className="section">
        <div className="section-header">
          <h1 className='mx-auto'>PENDAFTARAN MENTOR</h1>
        </div>

        <div className="section-body">
          <h2 className="section-title">Formulir Pendaftaran untuk Menjadi Mentor TENJIN</h2>
          <p className="section-lead">
            Dengan mengisi formulir ini, Anda dapat melakukan pengajuan untuk menjadi mentor pada platform TENJIN
          </p>
          <div className="card">
            <div className="card-header">
              <h4 className="mx-auto">Isilah Formulir Berikut dengan Baik dan Benar!</h4>
            </div>
            <div className="card-body">
              <div className="row mt-4">
                <div className="col-12 col-lg-8 offset-lg-2">
                  <div className="wizard-steps">
                    <div className={`wizard-step wizard-step-${currentStep === 1 ? 'active' : ''}`}>
                      <div className="wizard-step-icon">
                        <i className="far fa-user"></i>
                      </div>
                      <div className="wizard-step-label">
                        Data Diri
                      </div>
                    </div>
                    <div className={`wizard-step wizard-step-${currentStep === 2 ? 'active' : ''}`}>
                      <div className="wizard-step-icon">
                        <i className="fas fa-box-open"></i>
                      </div>
                      <div className="wizard-step-label">
                        Dokumen Pendukung
                      </div>
                    </div>
                    <div className={`wizard-step wizard-step-${currentStep === 3 ? 'active' : ''}`}>
                      <div className="wizard-step-icon">
                        <i className="fas fa-server"></i>
                      </div>
                      <div className="wizard-step-label">
                        Data Keuangan
                      </div>
                    </div>
                    <div
                      className={`wizard-step wizard-step-success wizard-step-${currentStep === 4 ? 'active' : ''}`}>
                      <div className="wizard-step-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="wizard-step-label">
                        Konfirmasi Data
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form className="wizard-content mt-2" onSubmit={handleSubmit}>
                <div className="wizard-pane">
                  {currentStep === 1 && (<>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="full_name">Nama Lengkap</label>
                        <input type="text"
                               className='form-control'
                               id="full_name" placeholder="Nama Lengkap"
                               name="full_name" disabled value={loggedUser.name}/>
                        <div className="invalid-feedback">
                        </div>
                      </div>

                      <div className="form-group col-6">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                               className="form-control"
                               id="email" disabled value={loggedUser.email}
                               name="email"/>
                        <small>Anda harus memverifikasi e-mail terlebih <br/> dahulu apabila belum pada
                          halaman <a
                            href="">Verifikasi
                            Email</a> </small>
                      </div>
                    </div>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="telephone">Nomor Telepon</label>
                        <input type="text"
                               className="form-control"
                               id="telephone" disabled value={loggedUser.telephone ?? '+62 '}
                               name="telephone"/>
                        <small>Jika nomor kosong, silahkan tambahkan pada settings</small>
                      </div>

                      <div className="form-group col-6">
                        <label>Jenis Kelamin</label>
                        <div className="selectgroup w-100">
                          <label className="selectgroup-item" htmlFor="MAN">
                            <input type="radio" name="gender" id="MAN" value="MAN" disabled
                                   className="selectgroup-input"
                                   checked={loggedUser.gender === 'MAN'}/>
                            <span className="selectgroup-button">Laki-Laki</span>
                          </label>
                          <label className="selectgroup-item" htmlFor="WOMAN">
                            <input type="radio" name="gender" id="WOMAN" value="100" disabled
                                   className="selectgroup-input"
                                   checked={loggedUser.gender === 'WOMAN'}/>
                            <span className="selectgroup-button">Wanita</span>
                          </label>
                        </div>
                      </div>

                    </div>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="pin">PIN (Personal Identification Number)</label>
                        <input type="text"
                               className="form-control"
                               id="pin" placeholder="Nomor PIN"
                               name="pin"
                               onChange={handleChange}/>
                        <div className="invalid-feedback">
                        </div>
                      </div>
                      <div className="col-6">
                        <br/>
                        <small>
                          Anda harus membuat nomor PIN untuk menjadi mentor agar akun anda menjadi lebih aman
                        </small>
                      </div>
                    </div>
                    <div className="row col-md-9 mx-auto">
                      <div className="row col-md-9 form-divider">Alamat Lengkap</div>
                      <div className="form-group col-6">
                        <label htmlFor="street">Jalan</label>
                        <input
                          type="text"
                          className={`form-control ${errors.street ? "is-invalid" : ""}`}
                          id="street"
                          placeholder="Nama Jalan"
                          name="street"
                          value={formData.mentorAddress.street}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                      </div>

                      <div className="form-group col-6">
                        <label htmlFor="village">Desa</label>
                        <input
                          type="text"
                          className="form-control"
                          id="village"
                          placeholder="Nama Desa"
                          name="village"
                          value={formData.mentorAddress.village}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}/>
                        <div className="invalid-feedback">{errors.village}</div>
                      </div>
                    </div>

                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="neighbourhoodNumber">RT</label>
                        <input
                          type="text"
                          className="form-control"
                          id="neighbourhoodNumber"
                          name="neighbourhoodNumber"
                          placeholder="Nomor RT"
                          value={formData.mentorAddress.neighbourhoodNumber}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        <div className="invalid-feedback">{errors.neighbourhoodNumber}</div>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="hamletNumber">RW</label>
                        <input
                          type="text"
                          className="form-control"
                          id="hamletNumber"
                          name="hamletNumber"
                          placeholder="Nomor RW"
                          value={formData.mentorAddress.hamletNumber}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        <div className="invalid-feedback">{errors.hamletNumber}</div>
                      </div>
                    </div>

                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="urbanVillage">Kelurahan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="urbanVillage"
                          name="urbanVillage"
                          placeholder="Nama Kelurahan"
                          value={formData.mentorAddress.urbanVillage}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        <div className="invalid-feedback">{errors.urbanVillage}</div>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="subDistrict">Kecamatan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subDistrict"
                          name="subDistrict"
                          placeholder="Nama Kecamatan"
                          value={formData.mentorAddress.subDistrict}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        <div className="invalid-feedback">{errors.subDistrict}</div>
                      </div>
                    </div>

                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="district">Kota/Kabupaten</label>
                        <input
                          type="text"
                          className="form-control"
                          id="district"
                          name="district"
                          placeholder="Nama Kota/Kabupaten"
                          value={formData.mentorAddress.district}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        <div className="invalid-feedback">{errors.district}</div>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="province">Provinsi</label>
                        <input
                          type="text"
                          className="form-control"
                          id="province"
                          name="province"
                          placeholder="Nama Provinsi"
                          value={formData.mentorAddress.province}
                          onChange={(e) => {
                            handleChange(e, "mentorAddress")
                          }}
                        />
                        <div className="invalid-feedback">{errors.province}</div>
                      </div>
                    </div>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-12">
                        <label>Foto Formal 3x4</label>
                        <FilePond
                          files={profilePhoto}
                          onupdatefiles={setProfilePhoto}
                          allowMultiple={false}
                          maxFiles={1}
                          name="profilePhoto"
                          labelIdle='Seret & Letakkan Gambar Anda atau <span class="filepond--label-action">Browse</span>'
                        />
                      </div>
                    </div>
                  </>)}
                  {currentStep === 2 && (<>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="identityCard">KTP (Kartu Tanda Penduduk)</label>
                        <div className="custom-file">
                          <input type="file" className="custom-file-input" name="identityCard"
                                 onChange={(e) => {
                                   handleChange(e)
                                   handleFileBrowser(e)
                                   setIdentityCard(e.target.files[0])
                                 }}
                                 id="identityCard"/>
                          <label className="custom-file-label" htmlFor="identityCard">Choose file</label>
                        </div>
                        <div className="invalid-feedback">
                        </div>
                      </div>
                      <div className="form-group col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="identityCardAction">Action</label>
                        <div className="d-flex flex-row">
                          <a href="#" className="btn btn-icon icon-left btn-primary"><i
                            className="far fa-edit"></i> Lihat</a>
                        </div>
                      </div>
                    </div>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="curriculumVitae">CV (Curriculum Vitae)</label>
                        <div className="custom-file">
                          <input type="file" className="custom-file-input" id="curriculumVitae"
                                 name="curriculumVitae"
                                 onChange={(e) => {
                                   handleChange(e)
                                   handleFileBrowser(e)
                                   setCurriculumVitae(e.target.files[0])
                                 }}/>
                          <label className="custom-file-label" htmlFor="curriculumVitae">Choose file</label>
                        </div>
                        <div className="invalid-feedback">
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="curriculumVitae_action">Action</label>
                        <div className="d-flex flex-row">
                          <a href="#" className="btn btn-icon icon-left btn-primary"><i
                            className="far fa-edit"></i> Lihat</a>
                        </div>
                        <div className="invalid-feedback">
                        </div>
                      </div>
                    </div>
                  </>)}
                  {currentStep === 3 && (<>
                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="accountHolderName">Nama Pemilik Rekening</label>
                        <input
                          type="text"
                          className="form-control"
                          id="accountHolderName"
                          name="accountHolderName"
                          placeholder="Nama Pemilik Rekening"
                          value={formData.mentorBankAccount.accountHolderName}
                          onChange={(e) => {
                            handleChange(e, "mentorBankAccount")
                          }}
                        />
                        <div className="invalid-feedback">{errors.accountHolderName}</div>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="bankName">Nama Bank</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bankName"
                          name="bankName"
                          placeholder="Nama Bank"
                          value={formData.mentorBankAccount.bankName}
                          onChange={(e) => {
                            handleChange(e, "mentorBankAccount")
                          }}
                        />
                        <div className="invalid-feedback">{errors.bankName}</div>
                      </div>
                    </div>

                    <div className="row col-md-9 mx-auto">
                      <div className="form-group col-6">
                        <label htmlFor="accountNumber">Nomor Rekening</label>
                        <input
                          type="text"
                          className="form-control"
                          id="accountNumber"
                          name="accountNumber"
                          placeholder="Nomor Rekening"
                          value={formData.mentorBankAccount.accountNumber}
                          onChange={(e) => {
                            handleChange(e, "mentorBankAccount")
                          }}
                        />
                        <div className="invalid-feedback">{errors.accountNumber}</div>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="paymentRecipientEmail">Email Penerima Pembayaran</label>
                        <input
                          type="text"
                          className="form-control"
                          id="paymentRecipientEmail"
                          name="paymentRecipientEmail"
                          placeholder="Email Penerima Pembayaran"
                          value={formData.mentorBankAccount.paymentRecipientEmail}
                          onChange={(e) => {
                            handleChange(e, "mentorBankAccount")
                          }}
                        />
                        <div className="invalid-feedback">{errors.paymentRecipientEmail}</div>
                      </div>
                    </div>
                  </>)}
                  {currentStep === 4 && (<div className="row col-md-9 mx-auto">
                    <div className="card card-primary">
                      <div className="card-header">
                        <h4 className="mx-auto">Summary</h4>
                      </div>
                      <div className="card-body">
                        <p>Card <code>.card-primary</code></p>
                      </div>
                    </div>
                  </div>)}
                  <div className="row col-md-9 mx-auto">
                    <div className="col-lg-6 col-md-8">
                      {currentStep > 1 && (<a onClick={prevStep}
                                              className="btn btn-icon icon-right btn-secondary"><i
                        className="fas fa-arrow-left"></i> Previous</a>)}
                    </div>
                    <div className="col-lg-6 col-md-8 text-right">
                      {currentStep < 4 ? (<a onClick={nextStep} className="btn btn-icon icon-right btn-primary">Next <i
                        className="fas fa-arrow-right"></i></a>) : (
                        <button type="submit" className="btn btn-success">Submit</button>)}
                    </div>
                  </div>

                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </AdminFullWrapper>)}
  </>)
}