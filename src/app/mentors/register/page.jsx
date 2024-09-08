"use client";
import AdminFullWrapper from "@/components/admin/AdminFullWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import {Loading} from "@/components/admin/Loading";
import CommonScript from "@/components/admin/CommonScript";
import {CommonUtil} from "@/common/utils/common-util";
import Cookies from "js-cookie";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // State untuk mengelola langkah wizard
  const [loggedUser, setLoggedUser] = useState({});
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    telephone: "",
    gender: "",
    pin: "",
    street: "",
    village: "",
    neighbourhood_number: "",
    hamlet_number: "",
    urban_village: "",
    sub_district: "",
    district: "",
    province: "",
    photo: null,
    identity_card: null,
    curriculum_vitae: null,
    account_holder_name: "",
    bank_name: "",
    account_number: "",
    payment_recipient_email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import("jquery")).default;
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

    // Update initial form data
    setFormData((prevData) => ({
      ...prevData,
      full_name: user.name || "",
      email: user.email || "",
      telephone: user.telephone || "",
      gender: user.gender || "",
    }));
  };

  // Fungsi untuk mengubah nilai form
  const handleChange = (e) => {
    const {name, value, files} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Fungsi untuk mengirim form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Proses submit data
      // Contoh: await api.submitForm(formData);

      // Reset errors jika berhasil
      setErrors({});
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorData = {};
        error.response.data.errors.forEach((err) => {
          errorData[err.path[0]] = err.message;
        });
        setErrors(errorData);
      }
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

  return (
    <>
      {loading ?
        <Loading/> : (
          <AdminFullWrapper>
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
                    <form className="wizard-content mt-2">
                      <div className="wizard-pane">
                        {currentStep === 1 && (
                          <>
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
                                <div className="invalid-feedback">
                                </div>
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
                                       id="telephone" disabled value={loggedUser.telephone}
                                       name="telephone"/>
                              </div>

                              <div className="form-group col-6">
                                <label htmlFor="gender">Jenis Kelamin</label>
                                <div className="selectgroup w-100">
                                  <label className="selectgroup-item">
                                    <input type="radio" name="gender" value="MAN" disabled
                                           className="selectgroup-input"
                                           checked={loggedUser.gender === 'MAN'}/>
                                    <span className="selectgroup-button">Laki-Laki</span>
                                  </label>
                                  <label className="selectgroup-item">
                                    <input type="radio" name="gender" value="100" disabled
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
                                       name="pin"/>
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
                                  value={formData.street}
                                  onChange={handleChange}
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
                                  value={formData.village}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.village}</div>
                              </div>
                            </div>

                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="neighbourhood_number">RT</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="neighbourhood_number"
                                  name="neighbourhood_number"
                                  placeholder="Nomor RT"
                                  value={formData.neighbourhood_number}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.neighbourhood_number}</div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="hamlet_number">RW</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="hamlet_number"
                                  name="hamlet_number"
                                  placeholder="Nomor RW"
                                  value={formData.hamlet_number}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.hamlet_number}</div>
                              </div>
                            </div>

                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="urban_village">Kelurahan</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="urban_village"
                                  name="urban_village"
                                  placeholder="Nama Kelurahan"
                                  value={formData.urban_village}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.urban_village}</div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="sub_district">Kecamatan</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="sub_district"
                                  name="sub_district"
                                  placeholder="Nama Kecamatan"
                                  value={formData.sub_district}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.sub_district}</div>
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
                                  value={formData.district}
                                  onChange={handleChange}
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
                                  value={formData.province}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.province}</div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="photo">Foto Formal 3x4</label>
                                <div id="image-preview" className="image-preview">
                                  <label htmlFor="image-upload" id="image-label">Choose File</label>
                                  <input
                                    type="file"
                                    name="photo"
                                    id="image-upload"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="invalid-feedback">{errors.photo}</div>
                              </div>
                            </div>
                          </>

                        )}
                        {currentStep === 2 && (
                          <>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="identity_card">KTP (Kartu Tanda Penduduk)</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="identity_card"/>
                                  <label className="custom-file-label" htmlFor="identity_card">Choose file</label>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="identity_card_number">Action</label>
                                <div className="d-flex flex-row">
                                  <a href="#" className="btn btn-icon icon-left btn-primary"><i
                                    className="far fa-edit"></i> Lihat</a>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="curriculum_vitae">CV (Curriculum Vitae)</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="curriculum_vitae"/>
                                  <label className="custom-file-label" htmlFor="curriculum_vitae">Choose file</label>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="curriculum_vitae_action">Action</label>
                                <div className="d-flex flex-row">
                                  <a href="#" className="btn btn-icon icon-left btn-primary"><i
                                    className="far fa-edit"></i> Lihat</a>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {currentStep === 3 && (
                          <>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="account_holder_name">Nama Pemilik Rekening</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="account_holder_name"
                                  name="account_holder_name"
                                  placeholder="Nama Pemilik Rekening"
                                  value={formData.account_holder_name}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.account_holder_name}</div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="bank_name">Nama Bank</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="bank_name"
                                  name="bank_name"
                                  placeholder="Nama Bank"
                                  value={formData.bank_name}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.bank_name}</div>
                              </div>
                            </div>

                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="account_number">Nomor Rekening</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="account_number"
                                  name="account_number"
                                  placeholder="Nomor Rekening"
                                  value={formData.account_number}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.account_number}</div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="payment_recipient_email">Email Penerima Pembayaran</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="payment_recipient_email"
                                  name="payment_recipient_email"
                                  placeholder="Email Penerima Pembayaran"
                                  value={formData.payment_recipient_email}
                                  onChange={handleChange}
                                />
                                <div className="invalid-feedback">{errors.payment_recipient_email}</div>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="row col-md-9 mx-auto">
                          <div className="col-lg-6 col-md-8">
                            {currentStep > 1 && (
                              <a onClick={prevStep}
                                 className="btn btn-icon icon-right btn-secondary"><i
                                className="fas fa-arrow-left"></i> Previous</a>
                            )}
                          </div>
                          <div className="col-lg-6 col-md-8 text-right">
                            {currentStep < 4 ? (
                              <a onClick={nextStep} className="btn btn-icon icon-right btn-primary">Next <i
                                className="fas fa-arrow-right"></i></a>
                            ) : (
                              <button type="submit" className="btn btn-success">Submit</button>
                            )}
                          </div>
                        </div>

                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </section>
          </AdminFullWrapper>
        )}
    </>
  )
}