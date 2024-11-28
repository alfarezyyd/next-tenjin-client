"use client"
import AdminFullWrapper from "@/components/admin/AdminFullWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Image} from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
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
  return (<AdminFullWrapper>
    <section className="section">


      <div className="section-body">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-sm-12 ">
            <div className="card">
              <div className="card-header">
                <h4 className="mx-auto">Terima Kasih</h4>
              </div>
              <div className="card-body">
                <div className="empty-state p-0" data-height="600">
                  <Image className=""
                         src="/images/rb_2754.png"
                         alt="image" width={400}/>
                  <h2 className="mt-0">Terima Kasih atas Partisipasi Anda!</h2>

                  <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/dashboard`} className="btn btn-primary mt-3">Kembali
                    ke Admin</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AdminFullWrapper>)
}