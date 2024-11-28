"use client"
import Banner from "./components/Banner";
import NFt4 from "@/../public/assets/img/nfts/Nft1.png";

import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import {tableColumnsTopCreators} from "./variables/tableColumnsTopCreators";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "@/components/card/NftCard";
import LandingWrapper from "@/components/landing/LandingWrapper";
import {useEffect, useState} from "react";
import {Loading} from "@/components/admin/Loading";
import HistoryCard from "@/app/marketplace/components/HistoryCard";
import {FaArrowAltCircleRight} from "react-icons/fa";

const Marketplace = () => {
  const [assistants, setAssistants] = useState();
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
      console.log(responseBody['result']['data']);
    } else {
      console.error('Failed to fetch assistance dependency', responseBody);
    }
  }
  return (
    <LandingWrapper>
      <div className="bg-lightPrimary">
        <div className="grid h-full grid-cols-1 gap-5 xl:grid-cols-3 2xl:grid-cols-3 mx-12">
          <div className="mt-12 col-span-1 h-fit w-full xl:col-span-2 2xl:col-span-2">
            {/* NFt Banner */}
            <Banner/>

            {/* NFt Header */}
            <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
              <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
                Trending NFTs
              </h4>
              <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
                <li>
                  <a
                    className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white bg-gray-300/50 p-2 px-3 rounded-3xl"
                    href=" "
                  >
                    Art
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                    href=" "
                  >
                    Music
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                    href=" "
                  >
                    Collection
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                    href=" "
                  >
                    Sports
                  </a>
                </li>
              </ul>
            </div>

            {/* NFTs trending card */}
            <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
              {assistants && assistants.length > 0 ?
                assistants.map((assistant, index) => (
                  <NftCard
                    key={`assistants-tre${index}`}
                    title={assistant.topic}
                    author={assistant.mentorName}
                    price={assistant.price}
                    image={NFt4}
                    mentorId={assistant.mentorId}
                    assistantId={assistant.id}
                    durationMinutes={assistant.durationMinutes}
                  />
                ))
                : <Loading/>
              }
            </div>

            {assistants && assistants.length > 0 ? (
              assistants.map((assistant, index) => (
                <div key={`assistance-parent${index}`}>
                  {/* Recenlty Added setion */}
                  <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                      {assistant.name}
                    </h4>
                    <h4
                      className="flex flex-row gap-3 items-center text-lg font-bold text-navy-700 dark:text-white p-2 px-3 rounded-full bg-white dark:bg-navy-700 hover:bg-primary-400 hover:text-white transition-all transition-duration-400">
                      Lihat Semua
                      <FaArrowAltCircleRight/>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {assistant.Assistance.map((assistant, index) => (
                      <NftCard
                        key={`assistants-${index}`}
                        title={assistant.topic}
                        author={assistant.mentor.user.name}
                        price={assistant.price}
                        assistantId={assistant.id}
                        mentorId={assistant.mentor.id}
                        durationMinutes={assistant.durationMinutes}
                        image={assistant.AssistanceResource[0].imagePath}
                      />
                    ))}
                  </div>
                </div>
              ))

            ) : <Loading/>}

          </div>
          <div className="mt-12 col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
            <TopCreatorTable
              extra="mb-5"
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
            <HistoryCard/>
          </div>
        </div>
      </div>
    </LandingWrapper>
  );
};

export default Marketplace;
