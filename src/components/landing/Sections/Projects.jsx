import React from "react";
import styled from "styled-components";
// Components
import ProjectBox from "@/components/landing/Elements/ProjectBox";
import FullButton from "@/components/landing/Buttons/FullButton";
// Assets
import {Button, Card, CardBody, CardFooter, CardHeader, Chip, Image} from "@nextui-org/react";
import {CheckIcon} from "@/components/admin/icons/check-icon";

export default function Projects() {
  return (
    <Wrapper id="projects">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Awesome Projects</h1>
            <p className="font13">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
              <br/>
              labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
              <Card
                className="pt-4 mt-12 w-full border-none shadow-xl transition-shadow duration-1000 hover:shadow-3xl "
                isFooterBlurred
                radius="lg">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">

                  <small className="text-default-500">500 Mentee</small>
                  <h4 className="font-bold text-large">Budi Suriono</h4>
                </CardHeader>
                <CardBody className="overflow-visible p-0 pt-2 ">
                  <Image
                    isZoomed="true"
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={400}
                  />
                </CardBody>
                <CardFooter
                  className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-2xl ml-1 z-10">
                  <p className="text-tiny text-white/80">2/30 Menit</p>
                  <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg"
                          size="sm">
                    Order Now
                  </Button>
                </CardFooter>
              </Card>
            </div>

          </div>
          <div className="row flexCenter">
            <div style={{margin: "50px 0", width: "200px"}}>
              <FullButton title="Load More" action={() => alert("clicked")}/>
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <Image className="radius8" src={"/assets/landing/img/add/add2.png"} alt="add"/>
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">A few words about company</h4>
              <h2 className="font40 extraBold">A Study of Creativity</h2>
              <p className="font12">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              </p>
              <ButtonsRow className="flexNullCenter" style={{margin: "30px 0"}}>
                <div style={{width: "190px"}}>
                  <FullButton title="Get Started" action={() => alert("clicked")}/>
                </div>
                <div style={{width: "190px", marginLeft: "15px"}}>
                  <FullButton title="Contact Us" action={() => alert("clicked")} border/>
                </div>
              </ButtonsRow>
            </AddRight>
          </Advertising>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  position: relative;
  width: 50%;

  p {
    max-width: 475px;
  }

  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }

    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 400px) {
    padding: 0;
  }
`;
