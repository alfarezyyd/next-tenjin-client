"use client"
import LandingWrapper from "@/components/landing/LandingWrapper";
import {useEffect, useState} from "react";
import {Loading} from "@/components/admin/Loading";
import {useParams} from "next/navigation";
import NftCard from "@/components/card/NftCard";

const Marketplace = () => {
  const [assistants, setAssistants] = useState();
  const [loading, setLoading] = useState(true);
  const routerParam = useParams();
  useEffect(() => {
    if (routerParam.categoryId) {
      console.log(routerParam.categoryId)
      fetchAllAssistants(routerParam.categoryId)
    }
  }, [routerParam.categoryId]);
  const fetchAllAssistants = async (id) => {
    let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/assistance/${id}`, {
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
              {/* Recenlty Added setion */}
              <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
                <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                  {assistants?.category.name}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {assistants?.assistance.map((assistant, index) => (
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
          </div>
        </div>
      </LandingWrapper>)
  );
};

export default Marketplace;
