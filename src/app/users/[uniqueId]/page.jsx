"use client"
import LandingWrapper from "@/components/landing/LandingWrapper";
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Image, Tab, Tabs} from "@nextui-org/react";
import {MdOutlineChat} from "react-icons/md";
import {FaBriefcase, FaMapMarkerAlt, FaUniversity} from "react-icons/fa";
import {useParams} from "next/navigation";
import {Loading} from "@/components/admin/Loading";
import NftCard from "@/components/card/NftCard";

const Page = () => {
  const routerParam = useParams()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchAllAssistance()
  }, [routerParam.uniqueId]);

  const [mentorData, setMentorData] = useState();

  async function fetchAllAssistance() {
    setLoading(true)
    if (routerParam.uniqueId) {
      console.log(routerParam.uniqueId);
      let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/${routerParam.uniqueId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      let responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setMentorData(responseBody['result']['data']);
        console.log(responseBody['result']['data']);
      } else {
        console.error('Failed to fetch assistance dependency', responseBody);
      }
      setLoading(false)
    }
  }

  return (
    loading ? (
      <Loading/>
    ) : (
      <LandingWrapper>
        <main className="profile-page">
          <section className="relative block h-[500px]">
            <div className="absolute top-0 w-full h-full bg-center bg-cover"
                 style={{backgroundImage: `url(https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80)`}}
            >
              <span id=" blackOverlay" className=" w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <div
              className=" top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{transform: "translateZ(0px)"}}>
              <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                   preserveAspectRatio="none"
                   version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <Image alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                               width={150}
                               className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] z-0"/>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div
                        className="py-6 mt-20  lg:mt-0 flex flex-row items-center gap-2 justify-center lg:justify-end">
                        <Button color="primary" variant={"bordered"}>
                          <MdOutlineChat className={"p-0 text-lg"}/>
                        </Button>
                        <Button color="primary" className="" variant={"ghost"}>Share</Button>
                        <Button color="primary" className="">Ikuti</Button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex  justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                        <span
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span
                          className="text-sm text-blueGray-400">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                        <span
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span
                          className="text-sm text-blueGray-400">Assistance</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                        <span
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span
                          className="text-sm text-blueGray-400">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                      {mentorData?.user?.name}
                    </h3>
                    <div
                      className="text-sm leading-normal mt-0 mb-1 text-gray-400 font-bold uppercase flex flex-row justify-center">
                      <FaMapMarkerAlt className="text-lg mr-2 "></FaMapMarkerAlt>
                      <span>{mentorData?.MentorAddress?.district}, {mentorData?.MentorAddress?.province}</span>
                    </div>
                    <div className="text-gray-600 mt-10 lg:mt-5 flex flex-row justify-center items-center">
                      <FaBriefcase className="text-lg mr-2 "/>
                      <span> {mentorData?.Experience?.positionName}</span>
                    </div>
                    <div className="text-gray-600 mt-10 lg:mt-5 flex flex-row justify-center items-center">
                      <FaUniversity className="text-lg mr-2 "/>
                      <span> {mentorData?.Education?.name}</span>
                    </div>

                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          An artist of considerable range, Jenna the name taken by
                          Melbourne-raised, Brooklyn-based Nick Murphy writes,
                          performs and records all of his own music, giving it a
                          warm, intimate feel with a solid groove structure. An
                          artist of considerable range.
                        </p>
                      </div>
                    </div>

                    <Tabs color={"primary"} aria-label="Tabs colors" radius="full" size={"lg"}>
                      <Tab key="photos" title="Assistance">
                        <Card className={"lg:max-w-5xl mx-auto"}>
                          <CardBody>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                              {mentorData?.Assistance?.map((value, index) => {
                                return (
                                  <NftCard
                                    key={`assistants-tre${index}`}
                                    title={value.topic}
                                    author={value.mentorName}
                                    price={value.price}
                                    mentorId={value.mentorId}
                                    assistantId={value.id}
                                    durationMinutes={value.durationMinutes}
                                    image={value.AssistanceResource[0].imagePath}

                                  />
                                )
                              })}
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="music" title="Music"> <Card>
                        <CardBody>
                          <span>AWDwadadaw</span>
                        </CardBody>
                      </Card></Tab>
                      <Tab key="videos" title="Videos"> <Card>
                        <CardBody>
                          <span>AWDwadadaw</span>
                        </CardBody>
                      </Card></Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </LandingWrapper>
    )

  );
};

export default Page;
