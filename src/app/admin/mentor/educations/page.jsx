"use client"
import '../../../../../public/assets/css/educations.scss'
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
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
        position: 'top-right',
        autoClose: 3000,
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/educations');
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
    fetchMentorEducations();
  }, [accessToken]);


  const fetchMentorEducations = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/educations`, {
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
          <section className="hero-section p-1">
            <div className="card-grid">
              {loading ? (  // Tampilkan loading selama data belum tersedia
                <Loading/>
              ) : (
                allMentorEducation.length > 0 ? (
                  allMentorEducation.map((mentorEducation) => (
                    <a key={`education-${mentorEducation.id}`} className="card" href="#">
                      <div className="card__background"
                           style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL})`}}></div>
                      <div className="card__content">
                        <p className="card__category">{mentorEducation.name}</p>
                        <h3 className="card__heading">{mentorEducation.degree}</h3>
                      </div>
                    </a>
                  ))
                ) : (
                  <p>No educations available.</p>
                ))
              }
            </div>
          </section>
        </div>
      </section>
    </AdminWrapper>
  )
}