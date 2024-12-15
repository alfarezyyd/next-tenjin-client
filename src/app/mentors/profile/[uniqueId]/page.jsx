"use client"
import LandingWrapper from "@/components/landing/LandingWrapper";
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Image, Tab, Tabs} from "@nextui-org/react";
import {FaBriefcase, FaCircle, FaMapMarkerAlt, FaUniversity} from "react-icons/fa";
import {useParams} from "next/navigation";
import {Loading} from "@/components/admin/Loading";
import NftCard from "@/components/card/NftCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {toast} from "react-toastify";

const Page = () => {
  const routerParam = useParams()
  const [loading, setLoading] = useState(true)
  const [selectedKey, setSelectedKey] = useState("assistance");
  useEffect(() => {
    fetchAllAssistance()
  }, [routerParam.uniqueId]);

  const [mentorData, setMentorData] = useState();
  const [mentorEducation, setMentorEducation] = useState([]);
  const [mentorExperience, setMentorExperience] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slides, setSlides] = useState([])

  function handleShare() {
    const currentUrl = window.location.href; // Mendapatkan URL halaman saat ini

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast.success("Link copied to clipboard!")
      })
      .catch(err => {
        toast.error("Error copied to clipboard!")
      });
  }

  async function fetchAllAssistance() {
    setLoading(true)
    if (routerParam.uniqueId) {
      let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/${routerParam.uniqueId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      let responseBody = await responseFetch.json();
      if (responseFetch.ok) {
        setMentorData(responseBody['result']['data']);
        console.log(responseBody['result']['data'])
      } else {
        console.error('Failed to fetch assistance dependency', responseBody);
      }
      setLoading(false)
    }
  }

  async function triggerCallExperience() {
    let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/experiences/${routerParam.uniqueId}`, {
      method: 'GET',
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
      }
    });
    let responseBody = await responseFetch.json();
    if (responseFetch.ok) {
      console.log(responseBody['result']['data'])
      setMentorExperience(responseBody['result']['data'])
    } else {
      console.error('Failed to fetch assistance dependency', responseBody);
    }
    setLoading(false)
  }

  async function triggerCallEducation() {
    let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/educations/${routerParam.uniqueId}`, {
      method: 'GET',
      includeCredentials: true,
      headers: {
        'Accept': 'application/json',
      }
    });
    let responseBody = await responseFetch.json();
    if (responseFetch.ok) {
      setMentorEducation(responseBody['result']['data'])
      console.log(responseBody['result']['data'])
    } else {
      console.error('Failed to fetch assistance dependency', responseBody);
    }
    setLoading(false)
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
                        <Image
                          alt="..."
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${mentorData?.user?.photoPath}`}
                          width={150}
                          height={150} // Tetapkan dimensi eksplisit
                          className="shadow-xl rounded-full max-h-[150px] max-w-[150px] object-cover align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 z-0"
                        /></div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div
                        className="py-6 mt-20  lg:mt-0 flex flex-row items-center gap-2 justify-center lg:justify-end">
                        <Button color="primary" className="" variant={"solid"} onClick={handleShare}>Share</Button>

                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex  justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                        <span
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{mentorData?._count?.Order ?? 0}</span><span
                          className="text-sm text-blueGray-400">Total Orders</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                        <span
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{mentorData?.Assistance?.length}</span><span
                          className="text-sm text-blueGray-400">Assistance</span>
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
                      <span> {mentorData?.Experience[0]?.positionName} - {mentorData?.Experience[0]?.companyName}</span>
                    </div>
                    <div className="text-gray-600 mt-10 lg:mt-5 flex flex-row justify-center items-center">
                      <FaUniversity className="text-lg mr-2 "/>
                      <span> {mentorData?.Education[0]?.name} - {mentorData?.Education[0]?.studyField}</span>
                    </div>

                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700"
                           dangerouslySetInnerHTML={{__html: mentorData.bio}}>

                        </p>
                      </div>
                    </div>

                    <Tabs color={"primary"} aria-label="Tabs colors" radius="full" size={"lg"}
                          selectedKey={selectedKey}
                          onSelectionChange={async (value) => {
                            setSelectedKey(value)
                            switch (value) {
                              case "experience":
                                setLoading(true)
                                await triggerCallExperience()
                                break;
                              case "education":
                                setLoading(true)
                                await triggerCallEducation()
                                break;
                            }
                          }}>
                      <Tab key="assistance" title="Assistance">
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
                      <Tab key="experience" title="Pengalaman" onPress={() => {
                        setLoading(true)
                      }}>
                        {loading ? (
                          <Loading/>
                        ) : (
                          <Card>
                            <CardBody>
                              <div className="relative my-5 text-left px-12 z-0">
                                {mentorExperience.length > 0 && mentorExperience.map((value, index) => {
                                  return (
                                    <div className="flex items-center relative" key={"education" + index}>
                                      <div className="hidden md:block w-20">
                                        <div
                                          className="font-bold italic">{value.startDate.substring(0, 4)}</div>

                                      </div>

                                      <div
                                        className="border-r-2 border-black absolute h-full left-1 md:left-20 top-2 z-10">
                                        <FaCircle className="-top-1 -ml-2 absolute"/>
                                        {index === mentorExperience.length - 1 && (
                                          <FaCircle className="bottom-0 -ml-2 absolute"/>
                                        )}
                                      </div>

                                      <div className="ml-10">
                                        <div className="font-bold">{value.companyName}</div>
                                        <div className="italic md:mb-4">{value.positionName}</div>
                                        <div
                                          className="font-semibold">{value.startDate.substring(0, 10)} sampai {value.startDate.substring(0, 10)}</div>
                                        <div className="mb-5" dangerouslySetInnerHTML={{__html: value.description}}>
                                        </div>
                                        {value?.ExperienceResource?.length > 0 && value?.ExperienceResource?.map((item, index) => (/* eslint-disable no-console */
                                          <Card key={index} isPressable>
                                            <CardBody className="overflow-visible p-0">
                                              <Image
                                                alt={item.title}
                                                className="w-full object-cover h-[140px]"
                                                onClick={() => {
                                                  setLightboxOpen(true)
                                                  setSlides(value.ExperienceResource.map((item) => {
                                                    return (
                                                      {
                                                        src: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/experience-resources/${mentorData.id}/${item.experienceId}/${item.imagePath}`,
                                                        width: 3840,
                                                        height: 5760
                                                      }
                                                    )
                                                  }))
                                                }}
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/experience-resources/${mentorData.user.id}/${item.experienceId}/${item.imagePath}`}
                                                width="100%"
                                              />
                                              <Lightbox
                                                open={lightboxOpen}
                                                close={() => setLightboxOpen(false)}
                                                slides={slides}
                                              />
                                            </CardBody>
                                          </Card>))}

                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </CardBody>
                          </Card>)}
                      </Tab>
                      <Tab key="education" title="Pendidikan"> <Card>
                        <CardBody>
                          <div className="relative my-5 text-left px-12">
                            {mentorEducation.length > 0 && mentorEducation.map((value, index) => {
                              return (
                                <div className="flex items-center relative" key={"education" + index}>
                                  <div className="hidden md:block w-20">
                                    <div
                                      className="font-bold italic">{value.startDate.substring(0, 4)}</div>

                                  </div>

                                  <div
                                    className="border-r-2 border-black absolute h-full left-1 md:left-20 top-2 z-10">
                                    <FaCircle className="-top-1 -ml-2 absolute"/>
                                    {index === mentorEducation.length - 1 && (
                                      <FaCircle className="bottom-0 -ml-2 absolute"/>
                                    )}
                                  </div>

                                  <div className="ml-10">
                                    <div className="font-bold">{value.name}</div>
                                    <div className="italic md:mb-4">{value.studyField}</div>
                                    <div
                                      className="font-semibold">{value.startDate.substring(0, 10)} sampai {value.startDate.substring(0, 10)}</div>
                                    <h1 className="font-semibold text-md">Deskripsi</h1>
                                    <div className="mb-5" dangerouslySetInnerHTML={{__html: value.description}}>
                                    </div>
                                    <hr/>
                                    <h1 className="font-semibold text-md">Aktivitas</h1>
                                    <div className="mb-5" dangerouslySetInnerHTML={{__html: value.activity}}>
                                    </div>
                                    <h1 className="font-semibold text-md">Perkumpulan</h1>
                                    <div className="mb-5" dangerouslySetInnerHTML={{__html: value.society}}>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
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
