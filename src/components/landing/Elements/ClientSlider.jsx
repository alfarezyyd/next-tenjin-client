import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import {Image} from "@nextui-org/react";
// Assets

export default function ClientSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo01.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo02.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo03.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo04.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo05.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo06.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo03.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo04.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo01.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <Image src={"/assets/landing/img/clients/logo01.svg"} alt="client logo" className={"w-full h-full p-[10%]"} />
        </LogoWrapper>
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  cursor: pointer;

  :focus-visible {
    outline: none;
    border: 0;
  }
`;
const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  padding: 10%;
`;