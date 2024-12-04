"use client"
import AdminWrapper from "@/components/admin/AdminWrapper";
import {useEffect, useState} from "react";

import CommonScript from "@/components/admin/CommonScript";
import Cookies from "js-cookie";
import {Loading} from "@/components/admin/Loading";
import {toast} from "react-toastify";
import {useRouter, useSearchParams} from "next/navigation";

import '@/../public/assets/css/components.css'

export default function Page() {
  const [accessToken, setAccessToken] = useState(null);
  const [allCategory, setAllCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Cek jika ada `notify=success` di query param
    if (searchParams.get('notify') === 'success') {
      toast.success('Data submitted successfully!', {
        position: 'top-right', autoClose: 3000, toastId: 'categories-success',
      });

      // Bersihkan query param setelah menampilkan toast
      router.replace('/admin/management/categories');
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
    fetchAllCategory();
  }, [accessToken]);

  useEffect(() => {
  }, [allCategory]);

  const fetchAllCategory = async () => {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`, {
          method: 'GET', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          console.log(responseBody.result.data)
          setAllCategory(responseBody.result.data);
        } else {
          console.error('Failed to fetch education', responseBody);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  async function triggerDeleteCategory(id) {
    if (accessToken) {
      try {
        const responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/${id}`, {
          method: 'DELETE', includeCredentials: true, headers: {
            'Accept': 'application/json', 'Authorization': `Bearer ${accessToken}`,
          },
        });
        const responseBody = await responseFetch.json();
        if (responseFetch.ok) {
          setAllCategory((prevAllMentorCategory) => prevAllMentorCategory.filter((education) => education.id !== id));
          router.push('/admin/management/categories?notify=success');
        } else {
          toast.error('Data gagal dihapus, kemungkinan terdapat asistensi yang menggunakan kategori tersebut')
          console.error('Failed to fetch categories', responseBody);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Menghentikan loading ketika data sudah diterima
      }
    }
  }

  return (
    loading ? (
      <Loading/>
    ) : (
      <AdminWrapper>
        <section className="section">
          <div className="section-header">
            <h1>Kategori Asistensi</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><a href="#">Admin</a></div>
              <div className="breadcrumb-item"><a href="#">Management</a></div>
              <div className="breadcrumb-item">Kategori</div>
            </div>
          </div>

          <div className="section-body">
            <h2 className="section-title">Overview</h2>
            <p className="section-lead w-50">
              Kelola data kategori management dengan praktis. Tambahkan, perbarui, atau hapus informasi kategori untuk
              mendukung profil management yang kredibel.
            </p>
            <div className="container">
              <div className="row">
                {loading ? (  // Tampilkan loading selama data belum tersedia
                  <Loading/>) : (allCategory.length > 0 ? (allCategory.map((managementCategory) => (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={`category-${managementCategory.id}`}>
                    <article className="article article-style-b">
                      <div className="article-header">
                        <div className="article-image"
                             data-background={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/category-icon/${managementCategory.logo}`}>
                        </div>

                      </div>
                      <div className="article-details">
                        <div className="article-title">
                          <h2><a href="#">{managementCategory?.name}</a></h2>
                        </div>
                        <div className="article-cta">
                          <div className="d-flex flex-row justify-content-between">
                            <a href="#" onClick={() => {
                              triggerDeleteCategory(managementCategory.id);
                            }} className="btn btn-icon btn-danger"><i
                              className="fas fa-trash"></i></a>
                            <a href={`/admin/management/categories/update/${managementCategory.id}`}>Edit <i
                              className="fas fa-chevron-right"></i></a>
                          </div>
                        </div>
                      </div>
                    </article>
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
                          <a href="/admin/management/categories/create" className="btn btn-primary mt-4">Create new
                            One</a>
                          <a href="#" className="mt-4 bb">Need Help?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AdminWrapper>
    )
  )
}