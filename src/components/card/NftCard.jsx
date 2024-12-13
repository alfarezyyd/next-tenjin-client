import {useState} from "react";
import Card from "@/components/card/index";
import Link from "next/link";
import {Image} from "@nextui-org/react";

const NftCard = ({title, author, price, image, uniqueId, mentorId, extra, durationMinutes, assistantId}) => {
  const [heart, setHeart] = useState(true);
  return (<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}mentors/${uniqueId}`}>
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}public/assets/assistants/${mentorId}/${assistantId}/${image}`}
            sizes={"contain"}
            isZoomed={true}
            className="mb-3 rounded-xl object-fill 3xl:h-full 3xl:w-full z-0"
            alt=""
          />
        </div>

        <div
          className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700">
              {" "}
              {title}{" "}
            </p>
            {author && (
              <p className="text-lg font-medium text-gray-600 md:mt-2">
                By {author}{" "}
              </p>
            )}
            <div className="flex flex-row items-center gap-3 mt-2">
              <Image src={"/assets/coin.svg"} className={"z-0"} alt="Star" width={30} height={30}/>
              <p className="mt-1 text-2xl font-bold text-amber-300 ">
                Rp. {price} <span className='text-xl text-black font-semibold'>/{durationMinutes} menit</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">

          </div>
          <button
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
          >
            View Details
          </button>
        </div>
      </div>
    </Card>
  </Link>)
    ;
};

export default NftCard;
