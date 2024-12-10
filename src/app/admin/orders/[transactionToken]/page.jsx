"use client"
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import AdminWrapper from "@/components/admin/AdminWrapper";
import CommonScript from "@/components/admin/CommonScript";
import '@/../public/assets/css/components.css'
import '@/../public/assets/css/invoice.css'
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {CommonUtil} from "@/common/utils/common-util";


export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const routerParam = useParams()
  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonScript();
    }

    setAccessToken(Cookies.get('accessToken'));
    if (typeof window !== 'undefined') {
      loadAssets();
    }
  }, [])

  useEffect(() => {
    setLoading(true);
    setDecodedAccessToken(CommonUtil.parseJwt(accessToken))
    setLoading(false);
  }, [accessToken])

  useEffect(() => {
    if (accessToken && routerParam.transactionToken) {
      fetchExistingOrder(routerParam.transactionToken)
    }
  }, [accessToken, routerParam.transactionToken]);

  async function fetchExistingOrder(transactionToken) {

    try {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/orders/${transactionToken}`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setOrder(responseBody.result.data)
        console.log(responseBody.result.data)
      } else {
        console.error('Failed to fetch experiences', responseBody);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false); // Menghentikan loading ketika data sudah diterima
    }
  }

  return (
    loading ? (<Loading/>) : (
      <AdminWrapper>
        <section className="section">
          <div className="section-header">
            <h1>Invoice</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><a href="#">Admin</a></div>
              <div className="breadcrumb-item"><a href="#">Mentor</a></div>
              <div className="breadcrumb-item">Riwayat Order</div>
            </div>
          </div>

          <div className="section-body">
            <div className="invoice">
              <div className="invoice-print">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="invoice-title">
                      <h2>Invoice</h2>
                      <div className="invoice-number">Order #{`${order?.id}`}</div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-md-6">
                        <address>
                          <strong>Billed To:</strong><br/>
                          {decodedAccessToken?.name}<br/>
                          -<br/>
                          -<br/>
                          -
                        </address>
                      </div>
                      <div className="col-md-6 text-md-right">
                        <address>
                          <strong>Send To:</strong><br/>
                          {order?.mentor?.user.name}<br/>
                          -<br/>
                          -<br/>
                          -
                        </address>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <address>
                          <strong>Payment Method:</strong><br/>
                          Visa ending **** 4242<br/>
                          {decodedAccessToken?.email}
                        </address>
                      </div>
                      <div className="col-md-6 text-md-right">
                        <address>
                          <strong>Order Date:</strong><br/>
                          {order?.createdAt?.substring(0, 10)}<br/><br/>
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="section-title">Order Summary</div>
                    <p className="section-lead">All items here cannot be deleted.</p>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover table-md">
                        <tbody>
                        <tr>
                          <th data-width="40">#</th>
                          <th>Topic</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-right">Totals</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>{order?.assistance?.topic}</td>
                          <td className="text-center">{Number(order?.assistance?.price || 0)}</td>
                          <td
                            className="text-center">{Number(order?.quantity || 0)}</td>
                          <td
                            className="text-right">{Number(order?.assistance?.price || 0) * Number(order?.quantity || 0)}</td>
                        </tr>

                        </tbody>
                      </table>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-8">
                        <div className="section-title">Catatan</div>
                        <p className="section-lead">
                          {order.note}
                        </p>

                      </div>
                      <div className="col-lg-4 text-right">
                        <div className="invoice-detail-item">
                          <div className="invoice-detail-name">Subtotal</div>
                          <div className="invoice-detail-value">
                            {Number(order?.assistance?.price || 0) * Number(order?.quantity || 0)}
                          </div>
                        </div>
                        <div className="invoice-detail-item">
                          <div className="invoice-detail-name">Tax</div>
                          <div className="invoice-detail-value">
                            {Number((order?.assistance?.price || 0) * Number(order?.quantity || 0) * 0.1)}
                          </div>
                        </div>
                        <hr className="mt-2 mb-2"/>
                        <div className="invoice-detail-item">
                          <div className="invoice-detail-name">Total</div>
                          <div className="invoice-detail-value invoice-detail-value-lg">
                            {Number((order?.totalPrice || 0))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
              <div className="text-md-right">
                <button onClick={() => {
                  window.print()
                }} className="btn btn-warning btn-icon icon-left"><i className="fas fa-print"></i> Print
                </button>
              </div>
            </div>
          </div>
        </section>
      </AdminWrapper>
    )
  )
}