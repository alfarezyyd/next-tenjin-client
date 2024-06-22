import React from "react";
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";

const list = [
  {
    title: "Orange",
    img: "/assets/landing/fruit-1.jpeg",
    price: "$5.50",
  },
  {
    title: "Tangerine",
    img: "/images/fruit-2.jpeg",
    price: "$3.00",
  },
  {
    title: "Raspberry",
    img: "/images/fruit-3.jpeg",
    price: "$10.00",
  },
  {
    title: "Lemon",
    img: "/images/fruit-4.jpeg",
    price: "$5.30",
  },
  {
    title: "Avocado",
    img: "/images/fruit-5.jpeg",
    price: "$15.70",
  },
  {
    title: "Lemon 2",
    img: "/images/fruit-6.jpeg",
    price: "$8.00",
  },
  {
    title: "Banana",
    img: "/images/fruit-7.jpeg",
    price: "$7.50",
  },
  {
    title: "Watermelon",
    img: "/images/fruit-8.jpeg",
    price: "$12.20",
  },
];
export default function MentorImageCard() {
  return (
    <>
      <Card className=" bg-pattern">
        <CardBody className="overflow-visible w-fit mx-auto ">
          <Image
            isBlurred
            alt="Card background"
            className="object-cover w-full"
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
          />
        </CardBody>
      </Card>
      <div className="mt-12 overflow-x-auto flex gap-2 no-scrollbar">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} className="flex-shrink-0 w-36"> {/* Set a fixed width */}
            <CardBody className="overflow-hidden p-0 rounded-xl"> {/* Set a fixed height */}
              <Image
                isZoomed
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
