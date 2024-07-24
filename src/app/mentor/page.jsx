"use client"
import LandingWrapper from "/components/landing/LandingWrapper";
import {Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Image} from "@nextui-org/react";

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
      <div className="mx-4 -mt-4 mb-96">
        <div id="upper-mentor"
             className='mx-auto max-w-7xl py-8 lg:px-4 md:px-2 sm:px-0 bg-faqblue rounded-2xl my-16 '>
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
                <div className="w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingWrapper>
  )
}