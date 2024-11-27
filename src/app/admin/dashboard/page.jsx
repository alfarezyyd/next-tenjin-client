"use client"
import CommonScript from "@/components/admin/CommonScript";
import {useEffect, useState} from "react";
import 'fullcalendar/dist/fullcalendar.min.css'
import '@/../public/assets/css/components.css'
import {Loading} from "@/components/admin/Loading";
import {useRouter} from "next/navigation";
import AdminWrapper from "@/components/admin/AdminWrapper";
import Cookies from "js-cookie";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await import('fullcalendar/dist/fullcalendar.min')
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

  }, [accessToken]);

  async function fullCalendarInitiation($) {
    "use strict";

    $("#myEvent").fullCalendar({
      height: 'auto',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      editable: true,
      events: [
        {
          title: 'Conference',
          start: '2018-01-9',
          end: '2018-01-11',
          backgroundColor: "#fff",
          borderColor: "#fff",
          textColor: '#000'
        },
        {
          title: "John's Birthday",
          start: '2018-01-14',
          backgroundColor: "#007bff",
          borderColor: "#007bff",
          textColor: '#fff'
        },
        {
          title: 'Reporting',
          start: '2018-01-10T11:30:00',
          backgroundColor: "#f56954",
          borderColor: "#f56954",
          textColor: '#fff'
        },
        {
          title: 'Starting New Project',
          start: '2018-01-11',
          backgroundColor: "#ffc107",
          borderColor: "#ffc107",
          textColor: '#fff'
        },
        {
          title: 'Social Distortion Concert',
          start: '2018-01-24',
          end: '2018-01-27',
          backgroundColor: "#000",
          borderColor: "#000",
          textColor: '#fff'
        },
        {
          title: 'Lunch',
          start: '2018-01-24T13:15:00',
          backgroundColor: "#fff",
          borderColor: "#fff",
          textColor: '#000',
        },
        {
          title: 'Company Trip',
          start: '2018-01-28',
          end: '2018-01-31',
          backgroundColor: "#fff",
          borderColor: "#fff",
          textColor: '#000',
        },
      ]

    });
  }

  return (
    loading ? (<Loading/>) : (
      <AdminWrapper>
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
                      $187,13
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
                        <div className="card-stats-item-count">24</div>
                        <div className="card-stats-item-label">Pending</div>
                      </div>
                      <div className="card-stats-item">
                        <div className="card-stats-item-count">12</div>
                        <div className="card-stats-item-label">Shipping</div>
                      </div>
                      <div className="card-stats-item">
                        <div className="card-stats-item-count">23</div>
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
                      59
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
                      <h4>Sales</h4>
                    </div>
                    <div className="card-body">
                      4,732
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h4>Budget vs Sales</h4>
                  </div>
                  <div className="card-body">
                    <div className="fc-overflow">
                      <div id="myEvent"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card gradient-bottom">
                  <div className="card-header">
                    <h4>Top 5 Products</h4>

                  </div>
                  <div className="card-body" id="top-5-scroll">
                    <ul className="list-unstyled list-unstyled-border">
                      <li className="media">
                        <img className="mr-3 rounded" width="55" src="../assets/img/products/product-3-50.png"
                             alt="product"/>
                        <div className="media-body">
                          <div className="float-right">
                            <div className="font-weight-600 text-muted text-small">86 Sales</div>
                          </div>
                          <div className="media-title">oPhone S9 Limited</div>
                          <div className="mt-1">
                            <div className="budget-price">
                              <div className="budget-price-square bg-primary" data-width="64%"></div>
                              <div className="budget-price-label">$68,714</div>
                            </div>
                            <div className="budget-price">
                              <div className="budget-price-square bg-danger" data-width="43%"></div>
                              <div className="budget-price-label">$38,700</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="media">
                        <img className="mr-3 rounded" width="55" src="../assets/img/products/product-4-50.png"
                             alt="product"/>
                        <div className="media-body">
                          <div className="float-right">
                            <div className="font-weight-600 text-muted text-small">67 Sales</div>
                          </div>
                          <div className="media-title">iBook Pro 2018</div>
                          <div className="mt-1">
                            <div className="budget-price">
                              <div className="budget-price-square bg-primary" data-width="84%"></div>
                              <div className="budget-price-label">$107,133</div>
                            </div>
                            <div className="budget-price">
                              <div className="budget-price-square bg-danger" data-width="60%"></div>
                              <div className="budget-price-label">$91,455</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="media">
                        <img className="mr-3 rounded" width="55" src="../assets/img/products/product-1-50.png"
                             alt="product"/>
                        <div className="media-body">
                          <div className="float-right">
                            <div className="font-weight-600 text-muted text-small">63 Sales</div>
                          </div>
                          <div className="media-title">Headphone Blitz</div>
                          <div className="mt-1">
                            <div className="budget-price">
                              <div className="budget-price-square bg-primary" data-width="34%"></div>
                              <div className="budget-price-label">$3,717</div>
                            </div>
                            <div className="budget-price">
                              <div className="budget-price-square bg-danger" data-width="28%"></div>
                              <div className="budget-price-label">$2,835</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="media">
                        <img className="mr-3 rounded" width="55" src="../assets/img/products/product-3-50.png"
                             alt="product"/>
                        <div className="media-body">
                          <div className="float-right">
                            <div className="font-weight-600 text-muted text-small">28 Sales</div>
                          </div>
                          <div className="media-title">oPhone X Lite</div>
                          <div className="mt-1">
                            <div className="budget-price">
                              <div className="budget-price-square bg-primary" data-width="45%"></div>
                              <div className="budget-price-label">$13,972</div>
                            </div>
                            <div className="budget-price">
                              <div className="budget-price-square bg-danger" data-width="30%"></div>
                              <div className="budget-price-label">$9,660</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="media">
                        <img className="mr-3 rounded" width="55" src="../assets/img/products/product-5-50.png"
                             alt="product"/>
                        <div className="media-body">
                          <div className="float-right">
                            <div className="font-weight-600 text-muted text-small">19 Sales</div>
                          </div>
                          <div className="media-title">Old Camera</div>
                          <div className="mt-1">
                            <div className="budget-price">
                              <div className="budget-price-square bg-primary" data-width="35%"></div>
                              <div className="budget-price-label">$7,391</div>
                            </div>
                            <div className="budget-price">
                              <div className="budget-price-square bg-danger" data-width="28%"></div>
                              <div className="budget-price-label">$5,472</div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
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
    )
  )
}