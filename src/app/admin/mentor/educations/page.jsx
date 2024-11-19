"use client"
import '../../../../../public/assets/css/educations.scss'
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter, useSearchParams} from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorEducation, setAllMentorEducation] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000,
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/mentor/educations');
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
    fetchMentorEducations();
  }, [accessToken]);

  useEffect(() => {
  }, [allMentorEducation]);

  const fetchMentorEducations = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/educations`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          console.log(responseBody)
          setAllMentorEducation(responseBody.result.data);
          console.log(responseBody.result.data);
        } else {
          console.error('Failed to fetch education', responseBody);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  async function triggerDeleteEducation(id) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/educations/${id}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllMentorEducation((prevAllMentorEducation) => prevAllMentorEducation.filter((education) => education.id !== id));
          router.push('/admin/mentor/educations?notify=success');
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

  return (<AdminWrapper>
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
        <div className="container">
          <div className="row">
            {loading ? (  // Tampilkan loading selama data belum tersedia
              <Loading/>) : (allMentorEducation.length > 0 ? (allMentorEducation.map((mentorEducation) => (
              <div className="col-sm-12 col-md-6 col-lg-4 mb-4 p-0" key={mentorEducation.id}>
                <div className="card-custom text-dark card-has-bg click-col"
                     style={{backgroundImage: `url(https://source.unsplash.com/600x900/?tech,street)`}}>
                  <img className="card-img d-none" src="https://source.unsplash.com/600x900/?tech,street"
                       alt=" Lorem Ipsum Sit Amet Consectetur dipisi?"/>
                  <div className="card-img-overlay d-flex flex-column">
                    <div className="card-body">
                      <small
                        className="card-meta mb-2">{mentorEducation.degree} | {mentorEducation.studyField}</small>
                      <h4 className="card-title mt-0 "><a className="text-dark"
                                                          href="https://creativemanner.com">{mentorEducation.name}</a>
                      </h4>
                      <small><i
                        className="far fa-clock"></i> {mentorEducation.startDate.substring(0, 10)} hingga {mentorEducation.endDate.substring(0, 10)}
                      </small>
                      <div id="accordion" className="pt-3">
                        <div className="accordion">
                          <div className="accordion-header" role="button" data-toggle="collapse"
                               data-target="#panel-body-1"
                               aria-expanded="true">
                            <h4>Description</h4>
                          </div>
                          <div className="accordion-body collapse show" id="panel-body-1" data-parent="#accordion">
                            <p className="mb-0" dangerouslySetInnerHTML={{__html: mentorEducation.description}}/>
                          </div>
                        </div>
                        <div className="accordion">
                          <div className="accordion-header" role="button" data-toggle="collapse"
                               data-target="#panel-body-2">
                            <h4>Society</h4>
                          </div>
                          <div className="accordion-body collapse" id="panel-body-2" data-parent="#accordion">
                            <p className="mb-0" dangerouslySetInnerHTML={{__html: mentorEducation.society}}/>
                          </div>
                        </div>
                        <div className="accordion">
                          <div className="accordion-header" role="button" data-toggle="collapse"
                               data-target="#panel-body-3">
                            <h4>Activity</h4>
                          </div>
                          <div className="accordion-body collapse" id="panel-body-3" data-parent="#accordion">
                            <p className="mb-0" dangerouslySetInnerHTML={{__html: mentorEducation.activity}}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex flex-row" style={{gap: 5}}>
                        <a
                          href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/mentor/educations/update/${mentorEducation.id}`}
                          className="btn btn-info">Edit</a>
                        <button className="btn btn-danger" onClick={() => {
                          triggerDeleteEducation(mentorEducation.id)
                        }}>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))) : (<p>No educations available.</p>))}
          </div>
        </div>
      </div>
    </section>
  </AdminWrapper>)
}