"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import "../../../../public/assets/css/custom.scss"
import {useEffect, useState} from "react";
import CommonStyle from "@/components/admin/CommonStyle";
import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import Image from "next/image";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allMentorExperience, setAllMentorExperience] = useState([]);
  const [loading, setLoading] = useState(false);  // Tambahkan state loading

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
  }, [accessToken]);


  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Order Assistensi</h1>
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
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <article className="article article-style-c d-flex flex-row">
                    <div className="col-sm-12 col-md-5 col-lg-4 p-0">
                      <Image src={`/images/authentication/login.jpg`} alt=""
                             className="w-100 h-100 m-0 p-0 object-cover" width={500}
                             height={500}/>
                    </div>
                    <div className="col-8">
                      <div className="article-details">
                        <div className="article-category"><a href="#">News</a>
                          <div className="bullet"></div>
                          <a href="#">5 Days</a></div>
                        <div className="article-title">
                          <h2><a href="#">Excepteur sint occaecat cupidatat non proident</a></h2>
                        </div>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. </p>
                        <div className="article-user">
                          <img alt="image" src="../assets/img/avatar/avatar-1.png"/>
                          <div className="article-user-details">
                            <div className="user-detail-name">
                              <a href="#">Hasan Basri</a>
                            </div>
                            <div className="text-job">Web Developer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </AdminWrapper>
  );
}
