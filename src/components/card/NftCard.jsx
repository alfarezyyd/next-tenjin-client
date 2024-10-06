import {IoHeart, IoHeartOutline} from "react-icons/io5";
import {useState} from "react";
import Card from "@/components/card/index";
import Image from "next/image";
import Link from "next/link";

const NftCard = ({title, author, price, image, mentorId, assistantId, extra}) => {
  const [heart, setHeart] = useState(true);
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/mentors/${mentorId}/assistants/${assistantId}`}>
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-full w-full">
          <div className="relative w-full">
            <Image
              src={image}
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              alt=""
            />
            <button
              onClick={() => setHeart(!heart)}
              className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                {heart ? (
                  <IoHeartOutline/>
                ) : (
                  <IoHeart className="text-brand-500"/>
                )}
              </div>
            </button>
          </div>

          <div
            className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700">
                {" "}
                {title}{" "}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                By {author}{" "}
              </p>
            </div>
          </div>

          <div
            className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
            <div className="flex">
              <p className="mb-2 text-sm font-bold text-brand-500 ">
                Price per Hour: Rp {price} <span></span>
              </p>
            </div>
            <button
              href=""
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            >
              Place Bid
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default NftCard;
