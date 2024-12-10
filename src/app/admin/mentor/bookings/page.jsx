"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

import '@/../public/assets/css/components.css'

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorOrder, setAllMentorOrder] = useState({});
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeBooking, setActiveBooking] = useState(null);
  const [formData, setFormData] = useState({
    meetingPlatform: '',
    meetingPasskey: '',
    meetingLink: ''
  });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notify') === 'success') {
      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/mentor/assistants');
    }
  }, [router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await import('sweetalert/dist/sweetalert.min')
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchMentorNotDoneOrder();
    }
  }, [accessToken]);


  const fetchMentorNotDoneOrder = async () => {
    try {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/orders`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        },
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setAllMentorOrder(responseBody.result.data);
      } else {
        console.error('Failed to fetch assistance', responseBody);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false); // Menghentikan loading ketika data sudah diterima
    }
  }


  async function triggerUpdateBooking(orderId, condition) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/orders/booking`, {
          method: 'POST', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
          }, body: JSON.stringify({
            orderId: orderId,
            bookingCondition: condition
          }),
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          toast.success('Booking successfully approved!', {
            position: 'top-right', autoClose: 3000, toastId: 'booking-update'
          })
          const mentorOrder = allMentorOrder.find(value => value.id === orderId);
          mentorOrder.orderCondition = condition;
          console.log(allMentorOrder, mentorOrder);

          setAllMentorOrder((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? {...order, ...mentorOrder} : order
            )
          );
        } else {
          console.error('Failed to fetch assistance', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }


  async function onChangeHandler(e) {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value,
    }));
  }

  async function triggerUpdateLink() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/orders/booking/${activeBooking.id}`, {
          method: 'POST', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
          }, body: JSON.stringify(formData),
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          toast.success('Booking successfully approved!', {
            position: 'top-right', autoClose: 3000, toastId: 'booking-success'
          })
          const mentorOrder = allMentorOrder.find(value => value.id === activeBooking.id);
          setAllMentorOrder([
            ...allMentorOrder.filter(value => value.id !== activeBooking.id),
            mentorOrder,
          ]);
          const $ = window.jQuery
          $("#exampleModal").modal("hide");
        } else {
          console.error('Failed to fetch assistance', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  async function triggerRejectBooking() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/orders/booking/reject`, {
          method: 'POST', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json',
          }, body: JSON.stringify({
            orderId: activeBooking.id,
            reason: reason,
          }),
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          toast.success('Booking successfully rejected!', {
            position: 'top-right', autoClose: 3000, toastId: 'booking-update'
          })
          setAllMentorOrder((prevOrders) =>
            prevOrders.filter((order) =>
              order.id !== activeBooking.id
            )
          );
          const $ = window.jQuery;
          $("#exampleModal1").modal("hide");
        } else {
          console.error('Failed to fetch assistance', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }

  }

  return (<AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Data Booking</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Mentor</a></div>
            <div className="breadcrumb-item">Pendidikan</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Overview</h2>
          <p className="section-lead w-50">
            Pantau dan kelola jadwal booking mentor dengan mudah. Lihat detail booking, atur jadwal, konfirmasi, atau
            batalkan pertemuan langsung dari satu halaman. <br/>
            PERHATIAN! BOOKING HANYA BERISI PESANAN YANG BELUM SELESAI
          </p>
          <div className="row">
            {loading ? (  // Tampilkan loading selama data belum tersedia
              <Loading/>) : (

              allMentorOrder.length ? allMentorOrder.map((value, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={`mentor-order-${index}`}>
                  <div className="card card-info">
                    <div className="card-body">
                      <ul className="list-group">
                        <div>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Nama Cohort
                            <span className="badge badge-primary badge-pill ml-3">{value.user.name}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Tanggal
                            <span
                              className="badge badge-primary badge-pill ml-3">{value.sessionStartTimestamp.substring(0, 10)}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Waktu
                            <span
                              className="badge badge-primary badge-pill ml-3">{value.sessionStartTimestamp.substring(11, 16)} - {value.sessionEndTimestamp.substring(11, 16)}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Topic
                            <span
                              className="badge badge-primary badge-pill text-wrap ml-3">{value.assistance.topic}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Status
                            <span
                              className={`badge badge-${value.orderCondition === "WAITING" ? 'warning' : value.orderCondition === "REJECT" ? 'danger' : 'primary'} badge-pill ml-3`}>{value.orderCondition}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Meeting Link
                            <span
                              className={`badge badge-${value.orderCondition === "WAITING" ? 'warning' : 'primary'} badge-pill ml-3`}>{value.meetingLink}</span>
                          </li>

                          {value.orderCondition === "WAITING" &&
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <button className="btn btn-sm btn-primary" onClick={() => {
                                swal({
                                  title: 'Apakah anda yakin menerima pesanan?',
                                  text: 'Ketika menerima, Anda harus menyelesaikan pertemuan tersebut',
                                  icon: 'warning',
                                  buttons: true,
                                  dangerMode: true,
                                })
                                  .then((willDelete) => {
                                    if (willDelete) {
                                      triggerUpdateBooking(value.id, "APPROVED")
                                      swal('Booking berhasil diterima', {
                                        icon: 'success',
                                      });
                                    } else {
                                      swal('Booking tetap dalam keadaan WAIITNG');
                                    }
                                  });
                              }}>Setujui
                              </button>
                              <button className="btn btn-sm btn-danger" onClick={() => {
                                setActiveBooking(value)
                                const $ = window.jQuery;
                                $('#exampleModal1').modal('show');
                              }}>Tolak
                              </button>
                            </li>
                          }
                          {value.orderCondition === "APPROVED" &&
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <button data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-primary"
                                      onClick={() => {
                                        setActiveBooking(value)
                                      }}
                              >Update
                              </button>
                            </li>
                          }
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              )) : (
                <Loading/>
              ))
            }
          </div>
        </div>
      </section>
      <div className="modal fade" tabIndex="-1" role="dialog" id="exampleModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Link Meeting</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Berikan informasi meeting yang akan dilakukan dengan cohort Anda</p>
              <div className="form-group">
                <label>Meeting Platform</label>
                <input type="text" className="form-control" name="meetingPlatform" value={formData.meetingPlatform}
                       onChange={onChangeHandler}/>
              </div>
              <div className="form-group">
                <label>Meeting Passkey</label>
                <input type="text" className="form-control" name="meetingPasskey" value={formData.meetingPasskey}
                       onChange={onChangeHandler}/>
                <small>Kosongkan jika tidak ada</small>
              </div>
              <div className="form-group">
                <label>Meeting Link</label>
                <input type="text" className="form-control" name="meetingLink" value={formData.meetingLink}
                       onChange={onChangeHandler}/>
              </div>
            </div>
            <div className="modal-footer bg-whitesmoke br">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => {
                triggerUpdateLink()
              }}>Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" tabIndex="-1" role="dialog" id="exampleModal1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alasan Penolakan</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Berikan alasan yang dapat diterima mengapa anda menolak</p>
              <div className="form-group">
                <div className="form-group">
                  <input type="text" className="form-control" name="meetingPasskey" value={reason}
                         onChange={(e) => {
                           setReason(e.target.value)
                         }}/>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-whitesmoke br">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => {
                triggerRejectBooking()
              }}>Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminWrapper>
  )
}