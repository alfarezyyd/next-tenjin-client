"use client"
import CommonScript from "@/components/admin/CommonScript";
import {useEffect, useRef, useState} from "react";
import 'fullcalendar/dist/fullcalendar.min.css'
import {Loading} from "@/components/admin/Loading";
import {useRouter} from "next/navigation";
import AdminWrapper from "@/components/admin/AdminWrapper";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import 'select2/dist/css/select2.min.css'
import '@/../public/assets/css/components.css'

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const selectScheduleRef = useRef(null);
  const selectLastFiveOrderRef = useRef(null);
  const [scheduleType, setScheduleType] = useState(null);
  const [lastFiveOrderType, setLastFiveOrderType] = useState(null);
  const [lastFiveOrder, setLastFiveOrder] = useState(null);
  const calendarRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      $(selectScheduleRef.current).on("change", () => {
        setScheduleType($(selectScheduleRef.current).val());
      })
      $(selectLastFiveOrderRef.current).on("change", () => {
        setLastFiveOrderType($(selectLastFiveOrderRef.current).val());
      })
      window.jQuery = $
      await import('fullcalendar/dist/fullcalendar.min')
      await import('select2/dist/js/select2.min')
      await fullCalendarInitiation($)
      await CommonScript();
      setAccessToken(Cookies.get('accessToken'));
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (decodedAccessToken) {
      fetchCurrentUser()
    }
  }, [decodedAccessToken]);

  async function fetchCurrentUser() {
    try {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/specific/${decodedAccessToken.uniqueId}`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        },
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setCurrentUser(responseBody.result.data);
      } else {
        console.error('Failed to fetch skill', responseBody);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false); // Menghentikan loading ketika data sudah diterima
    }
  }

  async function fullCalendarInitiation($) {
    $("#myEvent").fullCalendar({
      height: 'auto', header: {
        left: 'prev,next today', center: 'title', right: 'month,agendaWeek,agendaDay,listWeek'
      }, editable: true
    })
  }

  useEffect(() => {

  }, [scheduleType]);

  useEffect(() => {
    const initializeCalendar = async () => {
      if (scheduleType === "mentor") {
        await processEventData(currentUser?.userSpecificSchedule?.mentorSchedule)
      } else {
        await processEventData(currentUser?.userSpecificSchedule?.schedule)
      }
    };

    initializeCalendar();
  }, [currentUser, scheduleType]);

  useEffect(() => {
    if (lastFiveOrderType === "mentor") {
      setLastFiveOrder(currentUser?.userSpecificSchedule?.lastFiveMentorOrders)
    } else {
      setLastFiveOrder(currentUser?.userSpecificSchedule?.lastFiveOrders)
    }
  }, [lastFiveOrderType]);

  const processEventData = async (rawSchedule) => {
    if (calendarRef.current && currentUser) {
      const $ = window.jQuery;
      const calendar = $(calendarRef.current).fullCalendar('getCalendar');
      calendar.removeEvents(); // Hapus semua event lama
      const allEvent = [];
      // Tambahkan event berdasarkan jadwal pengguna
      rawSchedule.forEach((schedule) => {
        allEvent.push({
          title: schedule.title,
          start: schedule.start,
          end: schedule.end,
          allDay: false,
          backgroundColor: "#f56954",
          borderColor: "#f56954",
          textColor: '#fff'
        })
      });
      allEvent.forEach(event => {
        calendar.renderEvent(event, true); // Tambahkan event baru
      });
    }
  }

  return (loading ? (<Loading/>) : (<AdminWrapper>
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-statistic-2">
                <div className="card-icon shadow-primary bg-primary">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Balance</h4>
                  </div>
                  <div className="card-body">
                    Rp. {currentUser?.userDetail?.totalBalance}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-statistic-2">
                <div className="card-stats">
                  <div className="card-stats-title">Order Statistics</div>
                  <div className="card-stats-items">
                    <div className="card-stats-item">
                      <div
                        className="card-stats-item-count">{currentUser?.userSpecificSchedule?.countOrder?.failed}</div>
                      <div className="card-stats-item-label">Failed</div>
                    </div>
                    <div className="card-stats-item">
                      <div
                        className="card-stats-item-count">{currentUser?.userSpecificSchedule?.countOrder?.process}</div>
                      <div className="card-stats-item-label">Process</div>
                    </div>
                    <div className="card-stats-item">
                      <div
                        className="card-stats-item-count">{currentUser?.userSpecificSchedule?.countOrder?.completed}</div>
                      <div className="card-stats-item-label">Completed</div>
                    </div>
                  </div>
                </div>
                <div className="card-icon shadow-primary bg-primary">
                  <i className="fas fa-archive"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Orders</h4>
                  </div>
                  <div className="card-body">
                    {currentUser?.userSpecificSchedule?.countOrder && Object.values(currentUser?.userSpecificSchedule?.countOrder).reduce((acc, value) => acc + value, 0)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="card card-statistic-2">
                <div className="card-icon shadow-primary bg-primary">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Profit</h4>
                  </div>
                  <div className="card-body">
                    Rp.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header d-flex flex-row">
                  <div className="col-md-8">
                    <h4>Schedule</h4>
                  </div>
                  <div className="col-md-4 col-sm-4 d-flex flex justify-content-end">
                    <select className="form-control select2 col-md-2" ref={selectScheduleRef}>
                      <option value={"user"}>Jadwal Pengguna</option>
                      {currentUser?.userDetail?.Mentor &&
                        <option value={"mentor"}>Jadwal Mentor</option>
                      }
                    </select>
                  </div>
                </div>

                <div className="card-body">
                  <div className="fc-overflow">
                    <div id="myEvent" ref={calendarRef}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card gradient-bottom">
                <div className="card-header d-flex flex-row">
                  <div className="col-md-8 col-lg-6">
                    <h4>Last 5 Orders</h4>
                  </div>
                  <div className="col-md-4 col-lg-6 col-sm-6 d-flex flex justify-content-end">
                    <select className="form-control select2 col-md-2" ref={selectLastFiveOrderRef}>
                      <option value={"user"}>Pengguna</option>
                      {currentUser?.userDetail?.Mentor &&
                        <option value={"mentor"}>Mentor</option>
                      }
                    </select>
                  </div>
                </div>
                <div className="card-body" id="top-5-scroll">
                  {lastFiveOrder?.length > 0 && lastFiveOrder.map((item, index) => {
                    return (
                      <li className="media" key={`last-five-orders-${index}`}>
                        <img className="mr-3 rounded" width="55" src="../assets/img/products/product-3-50.png"
                             alt="product"/>
                        <div className="media-body">
                          <div className="float-right">
                            <div className="font-weight-600 text-muted text-small">86 Sales</div>
                          </div>
                          <div className="media-title">{item.assistance.topic}</div>
                          <div className="mt-1">
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </div>
                <div className="card-footer pt-3 d-flex justify-content-center">
                  <div className="budget-price justify-content-center">
                    <div className="budget-price-square bg-primary" data-width="20"></div>
                    <div className="budget-price-label">Selling Price</div>
                  </div>
                  <div className="budget-price justify-content-center">
                    <div className="budget-price-square bg-danger" data-width="20"></div>
                    <div className="budget-price-label">Budget Price</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminWrapper>
  ))
}