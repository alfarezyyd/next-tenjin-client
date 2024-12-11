"use client"
import React, {useContext, useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import LandingWrapper from "@/components/landing/LandingWrapper";
import {Alert, Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image} from "@nextui-org/react";
import {Loading} from "@/components/admin/Loading";
import {LandingContext} from "@/components/LandingProvider";
import Cookies from "js-cookie";
import {CommonUtil} from "@/common/utils/common-util";
import {BsInfoSquareFill} from "react-icons/bs";
import {PiHandWavingFill} from "react-icons/pi";
import {MdOutlineChat} from "react-icons/md";
import {toast} from "react-toastify";
import ErrorPage from "@/app/errors/ErrorPage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


export default function Page({}) {
  const [mentorData, setMentorData] = useState({});
  const pathName = useParams();
  const {push} = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const {isChatVisible, toggleChat, chatData, setChatData, activeChat, setActiveChat} = useContext(LandingContext);
  const [accessToken, setAccessToken] = useState(null);
  const [decodedAccessToken, setDecodedAccessToken] = useState(null);
  const [checkout, setCheckout] = useState("");
  const [isStateError, setIsStateError] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [imageAssistant, setImageAssistant] = useState(null);
  useEffect(() => {
    if (pathName.mentorId) {
      fetchMentorData(pathName.mentorId);
    }
  }, [pathName])

  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      setDecodedAccessToken(CommonUtil.parseJwt(accessToken));
    }
  }, [accessToken]);


  async function initiateCheckout() {
    localStorage.setItem("checkoutItem", "");
    const checkoutItem = JSON.stringify({
      topic: activeCategory['topic'],
      assistantId: activeCategory['id'],
      mentorId: activeCategory['mentorId'],
      categoryName: activeCategory['category']['name'],
      durationMinutes: activeCategory['durationMinutes'],
      price: activeCategory['price'],
      minutesDurations: activeCategory['durationMinutes'],
      logo: activeCategory['category']['logo'],
      note: "",
    })
    localStorage.setItem("checkoutItem", checkoutItem);
    setCheckout(checkoutItem)
  }

  useEffect(() => {
    if (checkout) {
      push("/checkout");
    }
  }, [checkout]);

  useEffect(() => {

  }, [decodedAccessToken]);
  const fetchMentorData = async (mentorId) => {
    setLoading(true);
    let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/mentors/${mentorId}`, {
      method: 'GET', headers: {
        'Accept': 'application/json',
      }
    });
    let responseBody = await responseFetch.json();
    let sumOfAllRating = 0;
    let firstAssistance = responseBody['result']['data']['Assistance'][0];
    if (responseFetch.ok) {
      setMentorData(responseBody['result']['data']);
      for (const reviewElement of firstAssistance['Review']) {
        sumOfAllRating += Number(reviewElement.rating)
      }
      const averageRatingOperation = sumOfAllRating / firstAssistance['Review'].length
      firstAssistance = {
        ...firstAssistance, averageRating: isNaN(averageRatingOperation) ? 0 : averageRatingOperation,
      }
      console.log(firstAssistance);
      setActiveCategory(firstAssistance);
      if (firstAssistance['AssistanceResource'].length > 0) {
        setSlides(firstAssistance['AssistanceResource'].map((item) => {
          return {
            src: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/assistants/${responseBody['result']['data']['id']}/${item.assistantId}/${item.imagePath}`,
            width: 3840,
            height: 5760
          }
        }))
        setImageAssistant(firstAssistance['AssistanceResource']);
      }
      setLoading(false);
    } else {
      setIsStateError(true);
      setLoading(false);

    }
  }

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

  if (isStateError) {
    return (<ErrorPage/>)
  }

  async function loadMoreReview() {
    console.log(activeCategory)
    console.log({
      mentorUniqueId: pathName.mentorId,
      assistantId: activeCategory.id,
      lastReviewId: activeCategory.Review[activeCategory.Review.length - 1].id,
    });
    let responseFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/reviews/more-review`, {
      method: 'POST', headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mentorUniqueId: pathName.mentorId,
        assistantId: activeCategory.assistantId,
        lastReviewId: activeCategory.Review[activeCategory.Review.length - 1].id,
      })
    });
    const responseBody = await responseFetch.json();
    if (responseFetch.ok) {
      console.log(responseBody.result.data)
    } else {
      toast.error('Terdapat kesalahan ketika meload review')
    }
  }

  return (loading ? <Loading/> : (<LandingWrapper>
    <div id="upper-mentor"
         className='mx-auto max-w-7xl py-8 lg:px-4 md:px-2 sm:px-0 bg-faqblue rounded-t-2xl mt-12 relative z-0 mb-12'>
      <div className="w-full mx-0">
        <div
          className="mx-3 md:mx-auto w-[95%] md:w-full max-w-7xl rounded-2xl bg-white py-6 px-3 md:px-6 mb-5 flex flex-row gap-5 justify-between">
          <div className="flex flex-row gap-5">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${mentorData?.user?.photoPath}`}
              className="w-20 h-20 hidden md:block"/>
            <div className="flex flex-col md:gap-0.5">
              <h1 className="text-xl font-semibold">{mentorData.user?.name}</h1>
              <div className="flex flex-col md:flex-row gap-2">
                <Chip
                  className={`text-white w-fit ${mentorData.user?.gender === "MAN" ? "bg-sky-400" : "bg-rose-400"}`}
                  size="sm"
                >
                  {mentorData.user?.gender === "MAN" ? "Laki-Laki" : "Perempuan"}
                </Chip>

              </div>
              <div className="flex flex-row gap-1 items-center">
                <h6 className="text-xs font-bold bg-zinc-200 rounded-full italic px-2 text-white">ID</h6>
                <h6 className="text-gray-600 font-medium">{mentorData.user?.uniqueId}</h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-center">

            <Button color="primary" className="" variant={"solid"} onClick={handleShare}>Share</Button>
          </div>
        </div>
        <div className="w-full md:mx-auto md:w-full max-w-7xl rounded-2xl mb-5">
          <div
            className="flex flex-col md:flex-row  md:gap-5 items-center px-0 md:pl-0 justify-center md:items-start">
            <div className="w-[95%] md:w-1/3 z-0">
              <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                  alt="Woman listening to music"
                  className="object-cover w-full h-80" // Set a fixed height
                  src={activeImage === "" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${mentorData?.user?.photoPath}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/mentor-resources/profile/${mentorData?.id}/${activeImage}`}
                  width={500}
                />
                <CardFooter
                  className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
                >
                  <p className="text-md text-white/80">Profile Photo</p>
                </CardFooter>
              </Card>
              <div className="gap-2 flex flex-row overflow-x-auto whitespace-nowrap mt-2">
                {mentorData.MentorResource !== undefined && mentorData?.MentorResource.map((item, index) => (/* eslint-disable no-console */
                  <Card key={index} isPressable shadow="sm" onPress={() => {
                    setActiveImage(item.imagePath)
                  }}>
                    <CardBody className="overflow-visible p-0">
                      <Image
                        alt={item.title}
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        shadow="sm"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/mentor-resources/profile/${mentorData?.id}/${item.imagePath}`}
                        width="100%"
                      />
                    </CardBody>
                  </Card>))}
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <Alert
                  color="success"
                  description={`${mentorData?.Education[0]?.name ?? '-'} - ${mentorData?.Education[0]?.studyField ?? '-'}`}
                  isVisible={true}
                  title={"Pendidikan Terakhir"}
                  variant="faded"
                  classNames={{
                    base: [''],
                    title: ['text-lg', 'font-bold'],
                    description: ['text-md', 'font-semibold'],
                    iconWrapper: ['my-auto']
                  }}
                />
                <Alert
                  color="primary"
                  description={`${mentorData?.Experience[0]?.positionName ?? '-'} - ${mentorData?.Experience[0]?.companyName ?? '-'}`}
                  isVisible={true}
                  title={"Pengalaman Kerja Terakhir"}
                  variant="flat"
                  classNames={{
                    base: [''],
                    title: ['text-lg', 'font-bold'],
                    description: ['text-md', 'font-semibold'],
                    iconWrapper: ['my-auto']
                  }}
                />
              </div>
              <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
                <div className="inline-flex gap-2">
                  {mentorData['MentorResources']?.length > 0 && mentorData['MentorResources']?.map((item, index) => (
                    <Card
                      key={`assistant-${index}`}
                      shadow="sm"
                      isPressable
                      className="w-32 inline-block"
                    >
                      <CardBody className="overflow-hidden p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          alt={item?.title}
                          className="object-cover h-[140px] w-full"
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/category-icon/${activeCategory?.category.logo}`}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-between">
                        <b>{item?.title}</b>
                        <p className="text-default-500">{item?.price}</p>
                      </CardFooter>
                    </Card>))}
                </div>
              </div>
            </div>
            <div className="w-[95%] md:w-2/3 flex flex-col gap-5">
              <Card>
                <CardBody>
                  <div className="flex flex-row gap-2 md:gap-5">
                    {mentorData['Assistance']?.length > 0 && mentorData.Assistance.map((item, index) => {
                      return (<div key={`assistance-mentor${index}`}>
                        <Card shadow="sm" key={index} isPressable onPress={() => {
                          let sumOfAllRating = 0;
                          for (const reviewElement of item['Review']) {
                            sumOfAllRating += Number(reviewElement.rating)
                          }
                          item.averageRating = sumOfAllRating === 0 ? 0 : sumOfAllRating / item['Review'].length
                          setActiveCategory(item)
                          setImageAssistant(item.AssistanceResource)
                          setSlides(item.AssistanceResource.map(resource => {
                            return {
                              src: `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/assistants/${mentorData.id}/${resource.assistantId}/${resource.imagePath}`,
                              width: 3840,
                              height: 5760
                            }
                          }))
                        }}
                              isBlurred
                              className={`${item.id === activeCategory?.id ? "bg-sky-500 text-white" : ""}`}>
                          <CardBody className="overflow-visible p-0">
                            <div className="flex flex-row gap-2 md:gap-5">
                              <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={item.title}
                                className="w-full max-w-24 md:max-w-full object-cover h-[100px] bg-sky-200"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/category-icon/${item?.category.logo}`}
                              />
                              <div
                                className="flex flex-col max-h-[100px] max-w-36 text-wrap truncate py-auto px-3 overflow-y-hidden justify-center">
                                <h3 className="font-semibold">{item.format}</h3>
                                <p className="text-xs">{item.category?.name}</p>
                                <h1 className="text-large font-sm overflow-y-hidden truncate">{item.topic}</h1>
                              </div>
                            </div>
                          </CardBody>
                        </Card>

                      </div>)
                    })}

                  </div>
                  <div className="flex flex-row mt-5">
                    <div className="w-52 h-56 md:w-36 md:h-40 rounded-md overflow-hidden shadow-md">
                      <Image
                        alt="Album cover"
                        className="object-cover w-52 h-56 md:w-36 md:h-40"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/category-icon/${activeCategory?.category.logo}`}
                      />
                    </div>
                    <div className="flex flex-col ml-5 gap-4">
                      <h1 className="text-3xl md:text-4xl font-bold">{activeCategory?.topic}</h1>
                      <div className="flex flex-row gap-3">
                        <Image src={"/assets/star.svg"} alt="Star" width={25}/>
                        <span className="text-xl font-bold">{activeCategory?.averageRating}.00</span>
                        <Divider orientation="vertical" className="bg-black"/>
                        <div className="text-xl font-light">Total Order {activeCategory?._count?.Order || 0}</div>
                      </div>
                      <div className="flex flex-row gap-3">
                        <Image src={"/assets/coin.svg"} alt="Star" width={40}/>
                        <div className="flex flex-col justify-center">
                          <div className="text-base text-amber-400"><span
                            className="text-xl font-bold">Rp. {activeCategory?.price}</span> /{activeCategory?.durationMinutes} Menit
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 mt-5">
                    <Button onClick={initiateCheckout} color="primary"
                            variant="ghost" size="lg" radius="full"
                            className="w-48 h-16"
                            isDisabled={decodedAccessToken?.mentorId == mentorData.id || accessToken === undefined}>
                      <span className="font-bold text-2xl">Order</span>
                    </Button>
                    <Button
                      isDisabled={accessToken === undefined || decodedAccessToken?.mentorId === mentorData.id}
                      variant="solid" size="lg"
                      radius="full" onClick={() => {
                      toggleChat()
                      setChatData((prevChatData) => {
                        const updatedChatData = {...prevChatData}; // Salin data lama (spread operator untuk objek)
                        // Hindari duplikasi dan tambahkan hanya jika berbeda
                        if (mentorData.user.uniqueId !== prevChatData.uniqueId && !updatedChatData[mentorData.user.uniqueId]) {
                          updatedChatData[mentorData.user.uniqueId] = {
                            name: mentorData.user?.name,
                            uniqueId: mentorData.user.uniqueId,
                            userId: mentorData.user.id,
                          };
                        } else {
                          setActiveChat({
                            name: chatData[mentorData.user.uniqueId]?.name,
                            messages: chatData[mentorData.user.uniqueId].messages,
                            destinationUserUniqueId: chatData[mentorData.user.uniqueId].uniqueId,
                            userId: chatData[mentorData.user.uniqueId].userId
                          })
                        }
                        return updatedChatData; // Kembalikan array yang diperbarui
                      });
                    }}
                      className="w-48 h-16 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ">
                      <div className="flex flex-row gap-4 font-bold text-3xl text-white items-center">
                        <PiHandWavingFill/>
                        <span className="text-2xl">Hi</span>
                      </div>
                    </Button>
                  </div>
                </CardBody>
              </Card>
              <Card className="max-w">
                <CardHeader className="flex gap-3 relative z-0">
                  <BsInfoSquareFill className={"text-3xl fill-sky-400"}/>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-back">Informasi Assistensi</h1>
                  </div>
                </CardHeader>
                <Divider/>
                <div className="p-2 rounded-md">
                  <CardBody className="bg-gray-200 rounded-xl">
                    <p dangerouslySetInnerHTML={{__html: activeCategory?.description}}></p>
                  </CardBody>
                  <CardFooter>
                    <div className="gap-2 flex flex-row overflow-x-auto whitespace-nowrap mt-2">
                      {imageAssistant.length > 0 && imageAssistant.map((item, index) => (/* eslint-disable no-console */
                        <Card key={index} isPressable>
                          <CardBody className="overflow-visible p-0">
                            <Image
                              alt={item.title}
                              className="w-full object-cover h-[140px]"
                              onClick={() => {
                                setLightboxOpen(true)
                              }}
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/assistants/${mentorData.id}/${item.assistantId}/${item.imagePath}`}
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
                  </CardFooter>
                </div>
                <Divider/>
                <CardFooter className={"flex flex-row gap-3"}>
                  {activeCategory?.AssistanceTag.map(tag => (
                    <Chip color="primary" key={`assistance-tag${tag.tagId}`}>{tag.tag?.name}</Chip>))}
                </CardFooter>
              </Card>
              <Card className="max-w">
                <CardHeader className="flex gap-3 relative z-0">
                  <Image
                    alt="nextui logo"
                    height={30}
                    radius="sm"
                    src="/assets/star.svg"
                    width={30}
                  />
                  <p className="text-2xl font-bold">{activeCategory?.averageRating}.00 &bull; Ulasan User
                    ({activeCategory?.Review.length})</p>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="flex flex-col gap-3">
                    {activeCategory?.Review.map((review) => {
                      return (<div className="flex flex-row gap-3" key={`review-${review.id}`}>
                        <div className="flex flex-row gap-5">
                          <Avatar
                            src={review.User?.photoPath === null || review.User?.photoPath === undefined ? "https://i.pravatar.cc/150?u=a04258114e29026302d" : `${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/user-resources/${review.User.photoPath}`}
                            size="md"
                            className="rounded-full flex-shrink-0"
                          />
                          <div className="flex flex-col">
                            <h3 className="text-xl font-semibold">{review.User?.name}</h3>
                            <p className="text-sm" dangerouslySetInnerHTML={{__html: review.review}}>

                            </p>
                          </div>
                        </div>
                      </div>)
                    })}

                  </div>

                </CardBody>
                <CardFooter>
                  <Button color="primary" variant="bordered" radius="full" className="mx-auto"
                          onClick={loadMoreReview}>
                    Lihat lebih banyak
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LandingWrapper>))
}