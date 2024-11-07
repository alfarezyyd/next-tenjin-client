"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import "../../../../../public/assets/css/custom.scss"
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {useRouter, useSearchParams} from "next/navigation";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorExperience, setAllMentorExperience] = useState([]);
  const [loading, setLoading] = useState(true);  // Tambahkan state loading
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
      router.replace('/admin/experiences');
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
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    fetchMentorExperiences();
  }, [accessToken]);

  async function fetchMentorExperiences() {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences`, {
          method: 'GET',
          includeCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllMentorExperience(responseBody.result.data);
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

  return (
    <AdminWrapper>
      <div>
        <section className="section">
          <div className="section-header">
            <h1>Pengalaman Mentor</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><a href="#">Admin</a></div>
              <div className="breadcrumb-item"><a href="#">Mentor</a></div>
              <div className="breadcrumb-item">Pengalaman</div>
            </div>
          </div>
          <div className="section-body">

            <section className="light">
              {loading ? (  // Tampilkan loading selama data belum tersedia
                <Loading/>
              ) : (
                allMentorExperience.length > 0 ? (
                  allMentorExperience.map((mentorExperience, index) => (
                    <article key={index} className="postcard light blue">
                      <a className="postcard__img_link" href="#">
                        <img className="postcard__img"
                             src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/experience-resources/${mentorExperience.mentorId}/${mentorExperience.experienceResource[0].id}/${mentorExperience.experienceResource[0].imagePath}`}
                             alt="Image Title"/>
                      </a>
                      <div className="postcard__text t-dark">
                        <h1 className="postcard__title blue"><a href="#">{mentorExperience.positionName}</a></h1>
                        <div className="postcard__subtitle small">
                          <time dateTime="2020-05-25 12:00:00">
                            <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                          </time>
                        </div>
                        <div className="postcard__bar"></div>
                        <div
                          className="postcard__preview-txt"
                          dangerouslySetInnerHTML={{__html: mentorExperience.description}}
                        ></div>
                        <div className="d-flex flex-row" style={{gap: 5 + "px"}}>
                          <button type="button" className="btn btn-primary btn-icon icon-left">
                            <i className="fas fa-tag mr-2"></i>{mentorExperience.companyName}
                          </button>


                          <button type="button" className="btn btn-primary btn-icon icon-left">
                            <i className="fas  fa-clock mr-2"></i>{mentorExperience.employmentType}
                          </button>


                          <button type="button" className="btn btn-primary btn-icon icon-left">
                            <i
                              className="fas fa-play mr-2"></i>{mentorExperience.startDate.substring(0, 10)} hingga {mentorExperience.endDate.substring(0, 10)}
                          </button>

                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>No experiences available.</p>
                )
              )}
            </section>
          </div>
        </section>
      </div>
    </AdminWrapper>
  );
}
