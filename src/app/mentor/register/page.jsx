"use client"
import AdminFullWrapper from "@/components/admin/AdminFullWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import {Loading} from "@/components/admin/Loading";
import CommonScript from "@/components/admin/CommonScript";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // State untuk mengelola langkah wizard
  useEffect(() => {
    const loadAssets = async () => {
      const $ = (await import('jquery')).default;
      await CommonStyle();
      await CommonScript();
    }
    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
  }, []);
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
                <p className="section-lead">This page is just an example for you to create your own page.</p>
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
                                <label htmlFor="street">Nama Lengkap</label>
                                <input type="text"
                                       className="form-control <?= $validationMessage != null && array_key_exists('street', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="street" placeholder="Nama Lengkap"
                                       name="street"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>

                              <div className="form-group col-6">
                                <label htmlFor="village">Email</label>
                                <input type="text"
                                       className="form-control <?= $validationMessage != null && array_key_exists('village', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="village" placeholder="Email"
                                       name="village"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="village">Nomor Telepon</label>
                                <input type="text"
                                       className="form-control <?= $validationMessage != null && array_key_exists('village', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="village" placeholder="Nomor Telepon"
                                       name="village"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>

                              <div className="form-group col-6">
                                <label htmlFor="street">Jenis Kelamin</label>
                                <div className="selectgroup w-100">
                                  <label className="selectgroup-item">
                                    <input type="radio" name="value" value="50" className="selectgroup-input"/>
                                    <span className="selectgroup-button">S</span>
                                  </label>
                                  <label className="selectgroup-item">
                                    <input type="radio" name="value" value="100" className="selectgroup-input"/>
                                    <span className="selectgroup-button">M</span>
                                  </label>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>

                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="village">PIN (Personal Identification Number)</label>
                                <input type="text"
                                       className="form-control <?= $validationMessage != null && array_key_exists('village', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="village" placeholder="Kode PIN"
                                       name="village"/>
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
                              <div className="row col-md-9 form-divider">
                                Alamat Lengkap
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="street">Jalan</label>
                                <input type="text"
                                       className="form-control <?= $validationMessage != null && array_key_exists('street', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="street" placeholder="Nama Jalan"
                                       name="street"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>

                              <div className="form-group col-6">
                                <label htmlFor="village">Desa</label>
                                <input type="text"
                                       className="form-control <?= $validationMessage != null && array_key_exists('village', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="village" placeholder="Nama Desa"
                                       name="village"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="neighbourhood_number">RT</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('neighbourhood_number', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="neighbourhood_number"
                                       name="neighbourhood_number" placeholder="Nomor RT"/>
                                <div className="invalid-feedback">
                                </div>

                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="hamlet_number">RW</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('hamlet_number', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="hamlet_number"
                                       name="hamlet_number" placeholder="Nomor RW"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="urban_village">Kelurahan</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('urban_village', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="urban_village"
                                       name="urban_village" placeholder="Nama Kelurahan"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="sub_district">Kecamatan</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('sub_district', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="sub_district"
                                       name="sub_district" placeholder="Nama Kecamatan"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="district">Kota/Kabupaten</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('district', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="district"
                                       name="district" placeholder="Nama Kota/Kabupaten"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="province">Provinsi</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('province', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="province"
                                       name="province" placeholder="Nama Provinsi"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="village">Foto Formal 3x4</label>
                                <div id="image-preview" className="image-preview">
                                  <label htmlFor="image-upload" id="image-label">Choose File</label>
                                  <input type="file" name="image" id="image-upload"/>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                          </>

                        )}
                        {currentStep === 2 && (
                          <>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="district">KTP (Kartu Tanda Penduduk)</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="customFile"/>
                                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="province">Action</label>
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
                                <label htmlFor="district">CV (Curiculum Vitae)</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="customFile"/>
                                  <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="province">Action</label>
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
                                <label htmlFor="district">Nama Pemilik Rekening</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('district', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="district"
                                       name="district" placeholder="Nama Kota/Kabupaten"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="province">Nama Bank</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('province', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="province"
                                       name="province" placeholder="Nama Provinsi"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                            </div>
                            <div className="row col-md-9 mx-auto">
                              <div className="form-group col-6">
                                <label htmlFor="district">Nomor Rekening</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('district', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="district"
                                       name="district" placeholder="Nama Kota/Kabupaten"/>
                                <div className="invalid-feedback">
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label htmlFor="province">Email Penerima Pembayaran</label>
                                <input type="text"
                                       className="form-control  <?= $validationMessage != null && array_key_exists('province', $validationMessage) ? 'is-invalid' : '' ?>"
                                       id="province"
                                       name="province" placeholder="Nama Provinsi"/>
                                <div className="invalid-feedback">
                                </div>
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