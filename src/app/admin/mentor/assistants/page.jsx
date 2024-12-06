"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {useRouter, useSearchParams} from "next/navigation";
import {toast} from "react-toastify";

import '@/../public/assets/css/components.css'
import {CommonUtil} from "@/common/utils/common-util";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [allMentorAssistance, setAllMentorAssistance] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data deleted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'assistants-success',
      })
      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/mentor/assistants');
    }
  }, [searchParams, router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchMentorAssistants();
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken]);


  const fetchMentorAssistants = async () => {
    try {
      const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/assistants/mentor`, {
        method: 'GET', includeCredentials: true, headers: {
          'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
        },
      });
      const responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setAllMentorAssistance(responseBody.result.data);
      } else {
        console.error('Failed to fetch assistance', responseBody);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false); // Menghentikan loading ketika data sudah diterima
    }
  }

  async function triggerDeleteAssistant(id) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/assistants/${id}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          toast.success('Data deleted successfully!', {
            position: 'top-right', autoClose: 3000, toastId: 'assistants-delete',
          })
          setAllMentorAssistance(allMentorAssistance.filter(value => value.id !== id));
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

  useEffect(() => {

  }, [allMentorAssistance])

  return (<AdminWrapper>
    <section className="section">
      <div className="section-header">
        <h1>Asistensi Mentor</h1>
        <div className="section-header-breadcrumb">
          <div className="breadcrumb-item active"><a href="#">Admin</a></div>
          <div className="breadcrumb-item"><a href="#">Mentor</a></div>
          <div className="breadcrumb-item">Asistensi</div>
        </div>
      </div>

      <div className="section-body">
        <h2 className="section-title">Overview</h2>
        <p className="section-lead w-50">
          Kelola layanan asistensi yang ditawarkan mentor. Sesuaikan topik, jadwal, dan detail lainnya agar sesuai
          dengan kebutuhan pengguna.
        </p>
        <div className="row">
          {loading ? (  // Tampilkan loading selama data belum tersedia
            <Loading/>) : (allMentorAssistance.length > 0 ? (allMentorAssistance.map((mentorAssistance) => (
            <div key={`mentorAssistance-${mentorAssistance.id}`} className="col-12 col-md-4 col-lg-4">

              <article className="article article-style-c">
                <div className="article-header">
                  <div
                    className="article-image"
                    style={{
                      backgroundImage: `url(${encodeURI(`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/assistants/${decodedAccessToken.mentorId}/${mentorAssistance.id}/${mentorAssistance.imagePath[0]}`)})`,
                    }}
                  ></div>
                </div>

                <div className="article-details">
                  <div className="article-category">
                    <a href="#">{mentorAssistance.categoryName}</a>
                    <div className="bullet"></div>
                    <a href="#">5 Days</a>
                  </div>
                  <div className="article-title">
                    <h2><a href="#">{mentorAssistance.topic}</a></h2>
                  </div>

                  <p dangerouslySetInnerHTML={{
                    __html: mentorAssistance.description
                  }}></p>
                  <div className=" d-flex flex-row">
                    <div className="article-user">
                      <img alt="image"
                           src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${decodedAccessToken?.photoPath}`}
                           className="rounded-circle mr-3" style={{
                        width: '45px', height: '45px', objectFit: 'cover',
                      }}/>
                      <div className="article-user-details">
                        <div className="user-detail-name">
                          <a href="#"></a>
                        </div>
                        <div className="text-job">Web Developer</div>
                      </div>
                    </div>
                    <div className="">
                      <a
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/assistants/update/${mentorAssistance.id}`}
                        className="btn btn-info">Edit</a>
                      <button className="btn btn-danger mt-1" onClick={() => {
                        triggerDeleteAssistant(mentorAssistance.id);
                      }}>Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>))) : (<div className="col-12 col-md-6 col-sm-12 p-0 mx-auto">
            <div className="card">
              <div className="card-header">
                <h4>Empty Data</h4>
              </div>
              <div className="card-body">
                <div className="empty-state" data-height="400">
                  <div className="empty-state-icon">
                    <i className="fas fa-question"></i>
                  </div>
                  <h2>We could`&apos;` find any data</h2>
                  <p className="lead">
                    Sorry we ca`&apos;` find any data, to get rid of this message, make at least 1 entry.
                  </p>
                  <a href="/admin/mentor/experiences/create" className="btn btn-primary mt-4">Create new One</a>
                  <a href="#" className="mt-4 bb">Need Help?</a>
                </div>
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </section>
  </AdminWrapper>)
}