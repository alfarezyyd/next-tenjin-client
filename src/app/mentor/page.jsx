"use client"
import LandingWrapper from "/src/components/landing/LandingWrapper";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Tab,
  Tabs
} from "@nextui-org/react";
import Link from "next/link";

export default function Page(props) {
  const list = [
    {
      title: "Orange",
      img: "/images/articles/article.png",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/articles/article.png",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/articles/article.png",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/articles/article.png",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/articles/article.png",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/articles/article.png",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/articles/article.png",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/articles/article.png",
      price: "$12.20",
    },
  ];
  return (
    <LandingWrapper>
      <div id="upper-mentor"
           className='mx-auto max-w-7xl py-8 lg:px-4 md:px-2 sm:px-0 bg-faqblue rounded-2xl mt-12'>
        <div className="w-full mx-4 lg:mx-0">
          <div
            className="mx-auto w-full max-w-6xl rounded-2xl bg-white py-6 px-6 mb-5 flex flex-row gap-5 justify-between">
            <div className="flex flex-row gap-5">
              <Avatar src="/images/articles/article.png" className="w-20 h-20"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Alia Teresea</h1>
                <div className="flex flex-row gap-2">
                  <Chip className="text-white text-rose-500" size="sm">Laki-Laki</Chip>
                  <Chip color="success" className="text-white" size="sm">Online</Chip>
                </div>
                <h6 className="text-zinc-100 font-medium">192321</h6>
              </div>
            </div>
            <div className="flex flex-row justify-content-center gap-3">
              <Button color="primary" className="self-center">C</Button>
              <Button color="primary" className="self-center">Share</Button>
              <Button color="primary" className="self-center">Ikuti</Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-6xl rounded-2xl mb-5">
            <div className="flex flex-row gap-5">
              <div className="w-1/3 z-0">
                <Card isFooterBlurred radius="lg" className="border-none">
                  <Image
                    alt="Woman listening to music"
                    className="object-cover w-full h-80" // Set a fixed height
                    src="/images/articles/article.png"
                    width={500}
                  />
                  <CardFooter
                    className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
                  >
                    <p className="text-tiny text-white/80">Available soon.</p>
                    <Button
                      className="text-tiny text-white bg-black/20"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                    >
                      Notify me
                    </Button>
                  </CardFooter>
                </Card>
                <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
                  <div className="inline-flex gap-2">
                    {list.map((item, index) => (
                      <Card
                        key={index}
                        shadow="sm"
                        isPressable
                        onPress={() => console.log("item pressed")}
                        className="w-32 inline-block"
                      >
                        <CardBody className="overflow-hidden p-0">
                          <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.title}
                            className="object-cover h-[140px] w-full"
                            src={item.img}
                          />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                          <b>{item.title}</b>
                          <p className="text-default-500">{item.price}</p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                <Tabs aria-label="Options" size="lg">
                  <Tab key="photos" title="Photos" className="flex flex-col gap-5">
                    <Card>
                      <CardBody>
                        <div className="flex flex-row gap-5">
                          <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-fit"
                                shadow="sm">
                            <CardBody>
                              <div
                                className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                  <Image
                                    alt="Album cover"
                                    className="object-cover w-20"
                                    shadow="md"
                                    src="https://nextui.org/images/album-cover.png"
                                  />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0">
                                      <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                                      <p className="text-small text-foreground/80">12 Tracks</p>
                                      <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                          <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-fit"
                                shadow="sm">
                            <CardBody>
                              <div
                                className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                  <Image
                                    alt="Album cover"
                                    className="object-cover w-20"
                                    shadow="md"
                                    src="https://nextui.org/images/album-cover.png"
                                  />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0">
                                      <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                                      <p className="text-small text-foreground/80">12 Tracks</p>
                                      <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        <div className="flex flex-row mt-5">
                          <Image
                            alt="NextUI hero Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                            className="w-32 h-40"
                          />
                          <div className="flex flex-col ml-5 gap-4">
                            <h1 className="text-4xl font-bold">Mobile Legend</h1>
                            <div className="flex flex-row gap-3">
                              <Image src={"/assets/star.svg"} alt="Star" width={25}/>
                              <span className="text-xl font-bold">5.00</span>
                              <Divider orientation="vertical" className="bg-black"/>
                              <div className="text-xl font-light">Order 133</div>
                            </div>
                            <div className="flex flex-row gap-3">
                              <Image src={"/assets/coin.svg"} alt="Star" width={50}/>
                              <div className="flex flex-col">
                                <div className="text-base text-amber-400"><span
                                  className="text-xl font-bold">1</span> /30 Menit
                                </div>
                                <div className="text-xs line-through text-gray-400">1/30 Menit</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 mt-5">
                          <Button color="primary" variant="ghost" size="lg" radius="full" className="w-48 h-16">
                            <span className="font-bold text-2xl">Order</span>
                          </Button>
                          <Button variant="solid" size="lg" radius="full"
                                  className="w-48 h-16 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ">
                            <span className="font-bold text-2xl text-white">Hi</span>
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="max-w">
                      <CardHeader className="flex gap-3">
                        <Image
                          alt="nextui logo"
                          height={40}
                          radius="sm"
                          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                          width={40}
                        />
                        <div className="flex flex-col">
                          <h1 className="text-2xl font-bold text-back">Biodata</h1>
                        </div>
                      </CardHeader>
                      <Divider/>
                      <div className="p-2 rounded-md">
                        <CardBody className="bg-gray-200 ">
                          <p>Make beautiful websites regardless of your design experience.</p>
                        </CardBody>
                      </div>
                      <Divider/>
                      <CardFooter>
                        <Link
                          isExternal
                          showAnchorIcon
                          href="https://github.com/nextui-org/nextui"
                        >
                          Visit source code on GitHub.
                        </Link>
                      </CardFooter>
                    </Card>
                    <Card className="max-w">
                      <CardHeader className="flex gap-3">
                        <Image
                          alt="nextui logo"
                          height={40}
                          radius="sm"
                          src="/assets/star.svg"
                          width={40}
                        />
                        <p className="text-2xl font-bold">5.00 &bull; Ulasan User (193)</p>
                      </CardHeader>
                      <Divider/>
                      <CardBody>
                        <div className="flex flex-row gap-3">
                          <div className="flex flex-row gap-5">
                            <Avatar
                              src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                              size="lg"
                              className="rounded-full flex-shrink-0"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-xl font-semibold">Budi Saranshin</h3>
                              <p className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequatur
                                cumque deserunt ea est fuga nisi,
                                numquam quasi quos ratione, reprehenderit soluta tempore totam. Dolores id nemo omnis
                                vero vitae.
                              </p>
                            </div>
                          </div>
                        </div>


                      </CardBody>
                      <CardFooter>
                        <Button color="primary" variant="bordered" radius="full" className="mx-auto">
                          Lihat lebih banyak
                        </Button>
                      </CardFooter>
                    </Card>
                  </Tab>
                  <Tab key="music" title="Music">
                    <Card>
                      <CardBody>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingWrapper>
  )
}