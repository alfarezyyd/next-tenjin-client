import React from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";


export default function MentorAssistance() {

  return (
    <>
      <div className="overflow-x-auto flex flex-row gap-2 no-scrollbar">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-[236px] h-fit hover:bg-sky-400 hover:text-white flex-shrink-0"
          shadow="sm">
          <CardBody className="overflow-hidden">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  shadow="md"
                  src="https://nextui.org/images/album-cover.png"
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-medium font-semibold text-inherit">Daily Mix</h3>
                    <h1 className="text-sm font-light">
                      <span className="text-xl font-semibold text-pink-400 inline">200</span>
                      /30 Menit</h1>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-[236px] h-fit hover:bg-sky-400 hover:text-white flex-shrink-0"
          shadow="sm">
          <CardBody className="overflow-hidden">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  shadow="md"
                  src="https://nextui.org/images/album-cover.png"
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-medium font-semibold text-inherit">Daily Mix</h3>
                    <h1 className="text-sm font-light">
                      <span className="text-xl font-semibold text-pink-400 inline">200</span>
                      /30 Menit</h1>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-full mt-4"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src="https://nextui.org/images/album-cover.png"
                width="100%"
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

              <div className="w-1/3 flex flex-col mt-3 gap-1">
                <Button size="lg" radius="full" variant="bordered" className="text-sky-500 border-sky-500 hover:bg-sky-500 hover:text-white">
                  Order
                </Button>
              </div>

            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
