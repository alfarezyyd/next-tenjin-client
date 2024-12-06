"use client"
import Banner from "./components/Banner";
import NftCard from "@/components/card/NftCard";
import LandingWrapper from "@/components/landing/LandingWrapper";
import {useEffect, useState} from "react";
import {Loading} from "@/components/admin/Loading";
import {FaArrowAltCircleRight} from "react-icons/fa";
import Link from "next/link";

const Marketplace = () => {
  const [assistants, setAssistants] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllAssistants()
  }, []);
  const fetchAllAssistants = async () => {
    let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/mentors`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    let responseBody = await responseFetch.json();
    if (responseFetch.ok) {
      setAssistants(responseBody['result']['data']);
      console.log(responseBody['result']['data'])
      setLoading(false);
    } else {
      console.error('Failed to fetch assistance dependency', responseBody);
    }
  }
  return (
    loading ? (<Loading/>) : (
      <LandingWrapper>
        <div className="bg-lightPrimary pb-12">
          <div className="grid h-full grid-cols-1 gap-5 xl:grid-cols-5 2xl:grid-cols-5 mx-12">
            <div className="mt-12 col-span-1 h-fit w-9/12 xl:col-span-5 mx-auto 2xl:col-span-3">
              {/* NFt Banner */}
              <Banner/>
              {/* NFt Header */}
              <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
                <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
                  Trending Assistance
                </h4>
              </div>

              {/* NFTs trending card */}
              <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-5">
                {assistants?.trendingAssistanceDetails && assistants.trendingAssistanceDetails.length > 0 &&
                  assistants.map((assistant, index) => (
                    <NftCard
                      key={`assistants-tre-${index}`}
                      title={assistant.topic}
                      author={assistant.mentor?.user?.name}
                      price={assistant.price}
                      assistantId={assistant.id}
                      mentorId={assistant.mentor?.user?.uniqueId}
                      durationMinutes={assistant.durationMinutes}
                    />
                  ))
                }
              </div>

              {assistants?.assistancePerCategory && assistants.assistancePerCategory.length > 0 && (
                assistants.assistancePerCategory.map((assistant, index) => (
                  <div key={`assistance-parent${index}`}>
                    {/* Recenlty Added setion */}
                    <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
                      <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        {assistant.name}
                      </h4>
                      <Link
                        href={`/marketplace/${assistant.id}`}
                        className="flex flex-row gap-3 items-center text-lg font-bold text-navy-700 dark:text-white p-2 px-3 rounded-full bg-white dark:bg-navy-700 hover:bg-primary-400 hover:text-white transition-all transition-duration-400">
                        Lihat Semua
                        <FaArrowAltCircleRight/>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      {assistant.Assistance.map((assistant, index) => (
                        <NftCard
                          key={`assistants-${index}`}
                          title={assistant.topic}
                          author={assistant.mentor?.user?.name}
                          price={assistant.price}
                          assistantId={assistant.id}
                          uniqueId={assistant.mentor?.user?.uniqueId}
                          mentorId={assistant.mentor?.id}
                          durationMinutes={assistant.durationMinutes}
                          image={assistant.AssistanceResource[0].imagePath}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>
      </LandingWrapper>)
  );
};

export default Marketplace;
