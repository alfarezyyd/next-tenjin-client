"use client"
import LandingLayout from "@/components/landing/LandingLayout";
import styled from "styled-components";
import {Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody} from "@nextui-org/react";
import {ShoppingCartIcon} from "@/components/landing/Icons/shopping-cart";
import MentorImageCard from "@/components/landing/Components/mentor-image-card";
import MentorProfileCard from "@/components/landing/Components/mentor-profile-card";
import {HeartIcon} from "@/components/landing/Icons/heart-icon";
import MentorAssistance from "@/components/landing/Components/mentor-assistance";

export default function Page(props) {
  return (
    <>
      <LandingLayout className="bg-slate-50">
        <Wrapper className="container">
          <Breadcrumbs className="mt-4"
                       underline="hover"
                       classNames={{
                         list: "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-small",
                       }}
                       itemClasses={{
                         item: "text-white/60 data-[current=true]:text-white",
                         separator: "text-white/40",
                       }}
                       variant="solid"
          >
            <BreadcrumbItem href="#shopping-cart">
              <ShoppingCartIcon/>
            </BreadcrumbItem>
            <BreadcrumbItem href="#checkout">Checkout</BreadcrumbItem>
            <BreadcrumbItem href="#payment">Payment</BreadcrumbItem>
            <BreadcrumbItem href="#delivery-address">Delivery Address</BreadcrumbItem>
          </Breadcrumbs>
          <div className="mt-4">
            <Card>
              <CardBody className="flex flex-row justify-between p-4">
                <div className="div">
                  <div className="flex flex-row">
                    <Avatar className="items-baseline-center" size="lg" isBordered color="success"
                            src="https://i.pravatar.cc/150?u=a04258114e29026302d"/>
                    <div className="flex flex-col gap-0 ml-6 justify-between">
                      <p>Nama</p>
                      <p>ID</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4 my-auto">
                  <Button isIconOnly color="danger" aria-label="Like">
                    <HeartIcon/>
                  </Button>
                  <Button color="primary" variant="solid">
                    Solid
                  </Button>
                  <Button color="primary" variant="solid">
                    Solid
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex h-full pt-4">
            <div className="w-7/12 h-full overflow-y-auto">
              <div className="space-y-4 mr-12">
                <MentorImageCard className="mt-36"/>
                <MentorProfileCard className="mt-36"/>
              </div>
            </div>
            <div className="w-5/12 h-full -pt-2">
              <div className="fixed w-1/3 bg-white">
                <MentorAssistance/>
                <p>Kandungan tetap di sini.</p>
                <p>Anda bisa menambahkan lebih banyak konten di sini.</p>
              </div>
            </div>
          </div>
        </Wrapper>
      </LandingLayout>
    </>
  )
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;