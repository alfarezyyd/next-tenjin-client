import React from "react";
import { SidebarContext } from "./InnerLayoutContext";
import {useLockedBody} from "@/components/admin/hooks/useBodyLock";
import {SidebarWrapper} from "@/components/admin/sidebar/sidebar";
import {NavbarWrapper} from "@/components/admin/navbar/navbar";


export const InnerLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
