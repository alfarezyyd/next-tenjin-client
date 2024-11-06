"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Loading} from "@/components/admin/Loading";
import {useRouter, useSearchParams} from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorAssistance, setAllMentorAssistance] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/assistants');
    }
  }, [searchParams, router]);

  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonStyle();
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
    }
    console.log(Cookies.get("accessToken"))
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    fetchMentorAssistants();
  }, [accessToken]);


  const fetchMentorAssistants = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/assistants/mentor`, {
          method: 'GET',
          includeCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllMentorAssistance(responseBody.result.data);
          console.log(responseBody.result.data);
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
  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Pendidikan Mentor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Mentor</a></div>
            <div className="breadcrumb-item">Pendidikan</div>
          </div>
        </div>

        <div className="section-body">

          <h2 className="section-title">Articles</h2>
          <p className="section-lead">This article component is based on card and flexbox.</p>
          <div className="row">
            {loading ? (  // Tampilkan loading selama data belum tersedia
              <Loading/>
            ) : (
              allMentorAssistance.length > 0 ? (
                allMentorAssistance.map((mentorAssistance) => (
                  <div key={`mentorAssistance-${mentorAssistance.id}`} className="col-12 col-md-4 col-lg-4">
                    <article className="article article-style-c">
                      <div className="article-header">
                        <div className="article-image" data-background="../assets/img/news/img13.jpg"></div>
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
                        <p>{mentorAssistance.description}</p>
                        <div className="article-user">
                          <img alt="image" src="../assets/img/avatar/avatar-1.png"/>
                          <div className="article-user-details">
                            <div className="user-detail-name">
                              <a href="#"></a>
                            </div>
                            <div className="text-job">Web Developer</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))
              ) : (
                <p>No assistances available.</p>
              ))
            }
          </div>
        </div>
      </section>
    </AdminWrapper>
  )
}