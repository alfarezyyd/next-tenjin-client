"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Loading} from "@/components/admin/Loading";

export default function Page() {
  const buttonColors = ['primary', 'danger', 'warning', 'success', 'dark']
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorSkill, setAllMentorSkill] = useState({});
  const [loading, setLoading] = useState(true);
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
    fetchMentorSkills();
  }, [accessToken]);


  const fetchMentorSkills = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/skills`, {
          method: 'GET',
          includeCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          console.log(responseBody)
          setAllMentorSkill(responseBody.result.data);
          console.log(responseBody.result.data);
        } else {
          console.error('Failed to fetch skill', responseBody);
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
          <h1>Kemampuan Mentor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Mentor</a></div>
            <div className="breadcrumb-item">Pendidikan</div>
          </div>
        </div>

        <div className="section-body">
          <section className="hero-section p-1">
            <div className="card-grid">
              <div className="col-6 col-md-6 col-sm-12 col-lg-6">
                <div className="d-flex flex-row flex-wrap" style={{gap: 5 + "px"}}>
                  {loading ? (  // Tampilkan loading selama data belum tersedia
                    <Loading/>
                  ) : (
                    allMentorSkill.length > 0 ? (
                      allMentorSkill.map((mentorSkill, index) => (

                        <button key={`mentorSkill-${mentorSkill.id}`} type="button"
                                className={`btn btn-${buttonColors[index % buttonColors.length]}`}>
                          {mentorSkill.name}
                        </button>
                      ))
                    ) : (
                      <p>No skills available.</p>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </AdminWrapper>
  )
}