"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {useRouter, useSearchParams} from "next/navigation";

import {toast} from 'react-toastify';
import '@/../public/assets/css/components.css'

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
        position: 'top-right', autoClose: 3000,
        toastId: 'mentor-experiences-success',
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/mentor/experiences'); // Hapus query params setelah notifikasi
    }
  }, [searchParams, router]);
  useEffect(() => {
    async function loadAssets() {
      const $ = (await import('jquery')).default;
      await CommonScript();
    }

    if (typeof window !== 'undefined') {
      loadAssets();
      setLoading(false);
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
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
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

  async function triggerDeleteExperiences(id) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/experiences/${id}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          router.push('/admin/mentor/experiences?notify=success');
          setAllMentorExperience({
            ...allMentorExperience.filter((value) => value.id !== id),
          })
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
    loading ? (<Loading/>) : (<AdminWrapper>
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
            <h2 className="section-title">Overview</h2>
            <p className="section-lead w-50">
              Kelola data pengalaman mentor dengan mudah. Tambahkan, perbarui, atau hapus informasi pengalaman untuk
              memastikan profil mentor selalu up-to-date.
            </p>

            <section className="light">
              {loading ? (  // Tampilkan loading selama data belum tersedia
                <Loading/>) : (allMentorExperience.length > 0 ? (allMentorExperience.map((mentorExperience, index) => (
                <article key={index} className="postcard light blue">
                  <a className="postcard__img_link" href="#">
                    <img className="postcard__img"
                         src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/experience-resources/${mentorExperience.mentorId}/${mentorExperience.id}/${mentorExperience.experienceResource[0].imagePath}`}
                         alt="Image Title"/>
                  </a>
                  <div className="postcard__text t-dark">
                    <h1 className="postcard__title blue"><a href="#">{mentorExperience.positionName}</a></h1>
                    <div className="postcard__subtitle small">
                      <time dateTime="2020-05-25 12:00:00">
                        <i className="fas fa-calendar-alt mr-2"></i>{mentorExperience.updatedAt.substring(0, 10)}
                      </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div
                      className="postcard__preview-txt"
                      dangerouslySetInnerHTML={{__html: mentorExperience.description}}
                    ></div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-row" style={{gap: 5 + "px"}}>
                        <button type="button" className="btn btn-primary btn-icon icon-left">
                          <i className="fas fa-tag mr-2"></i>{mentorExperience.companyName}
                        </button>

                        <button type="button" className="btn btn-info btn-icon icon-left">
                          <i className="fas  fa-clock mr-2"></i>{mentorExperience.employmentType}
                        </button>


                        <button type="button" className="btn btn-warning btn-icon icon-left">
                          <i
                            className="fas fa-play mr-2"></i>{mentorExperience.startDate.substring(0, 10)} hingga {mentorExperience.endDate.substring(0, 10)}
                        </button>
                      </div>
                      <div className="d-flex flex-row" style={{gap: 5 + "px"}}>
                        <a
                          href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/mentor/experiences/update/${mentorExperience.id}`}
                          className="btn btn-primary btn-icon icon-left text-white">
                          <i className="fas fa-pen mr-2"></i>Update
                        </a>

                        <button type="button" className="btn btn-danger btn-icon icon-left"
                                onClick={() => {
                                  triggerDeleteExperiences(mentorExperience.id);
                                }}>
                          <i
                            className="fas fa-trash mr-2"></i>Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </article>))) : (<div className="col-12 col-md-6 col-sm-12 p-0 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Empty Data</h4>
                  </div>
                  <div className="card-body">
                    <div className="empty-state" data-height="400">
                      <div className="empty-state-icon">
                        <i className="fas fa-question"></i>
                      </div>
                      <h2>We couldn't find any data</h2>
                      <p className="lead">
                        Sorry we can't find any data, to get rid of this message, make at least 1 entry.
                      </p>
                      <a href="/admin/mentor/experiences/create" className="btn btn-primary mt-4">Create new One</a>
                      <a href="#" className="mt-4 bb">Need Help?</a>
                    </div>
                  </div>
                </div>
              </div>))}
            </section>
          </div>
        </section>
      </div>
    </AdminWrapper>));
}
