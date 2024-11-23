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
          {loading ? (  // Tampilkan loading selama data belum tersedia
            <Loading/>) : (allMentorEducation.length > 0 ? (allMentorEducation.map((mentorEducation) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4 p-0" key={mentorEducation.id}>
              <div className="card-custom text-dark card-custom-has-bg click-col"
                   style={{backgroundImage: `url(https://source.unsplash.com/600x900/?tech,street)`}}>
                <img className="card-custom-img d-none" src="https://source.unsplash.com/600x900/?tech,street"
                     alt=" Lorem Ipsum Sit Amet Consectetur dipisi?"/>
                <div className="card-custom-img-overlay d-flex flex-column">
                  <div className="card-custom-body">
                    <small
                      className="card-custom-meta mb-2">{mentorEducation.degree} | {mentorEducation.studyField}</small>
                    <h4 className="card-custom-title mt-0 "><a className="text-dark"
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
                  <div className="card-custom-footer">
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
            </div>))) : (
            <div className="col-12 col-md-6 col-sm-12 p-0 mx-auto">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  </AdminWrapper>)
}