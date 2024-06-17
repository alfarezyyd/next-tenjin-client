import React from "react";
import styled from "styled-components";
import {Link} from "react-scroll";
// Assets
import CloseIcon from "@/../public/assets/landing/svg/CloseIcon";
import LogoIcon from "@/../public/assets/landing/svg/Logo";

export default function Sidebar({sidebarOpen, toggleSidebar}) {
  return (
    <Wrapper sidebarOpen={sidebarOpen}>
      <SidebarHeader>
        <div className="flexNullCenter">
          <LogoIcon/>
          <h1 className="whiteColor font20" style={{marginLeft: "15px"}}>
            fanatic
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)}>
          <CloseIcon/>
        </CloseBtn>
      </SidebarHeader>

      <UlStyle>
        {["home", "services", "projects", "blog", "pricing", "contact"].map((item) => (
          <li key={item} className="semiBold font15 pointer">
            <Link
              onClick={() => toggleSidebar(!sidebarOpen)}
              activeClass="active"
              className="whiteColor"
              style={{padding: "10px 15px"}}
              to={item}
              spy={true}
              smooth={true}
              offset={-60}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          </li>
        ))}
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        <li className="semiBold font15 pointer">
          <a href="/" style={{padding: "10px 30px 10px 0"}} className="whiteColor">
            Log in
          </a>
        </li>
        <li className="semiBold font15 pointer flexCenter">
          <a href="/" className="radius8 lightBg" style={{padding: "10px 15px"}}>
            Get Started
          </a>
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${({sidebarOpen}) => (sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  background: #000; // Add background color to make it visible
  transition: right 0.3s ease;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px 0;
`;

const CloseBtn = styled.button`
  border: 0;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;

const UlStyle = styled.ul`
  padding: 40px;

  li {
    margin: 20px 0;
  }
`;
