"use client"
import LandingLayout from "@/components/landing/LandingLayout";
import styled from "styled-components";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {ShoppingCartIcon} from "@/components/landing/Icons/shopping-cart";
import ProductCard from "@/components/landing/Components/product-card";

export default function Page(props) {
  return (
    <>
      <LandingLayout>
        <Wrapper>
          <div className="flex h-full pt-16 container">
            <div className="w-2/3 h-full overflow-y-auto p-4">
              <div className="space-y-4">
                <Breadcrumbs
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
                <ProductCard className="mt-24"/>
              </div>
            </div>
            <div className="w-1/3 h-full bg-gray-100 p-4">
              <div className="fixed  w-1/3 bg-white py-4">
                <h1 className="text-2xl font-bold">Kolom Kanan</h1>
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