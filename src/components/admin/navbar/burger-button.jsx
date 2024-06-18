import React from "react";
import {useSidebarContext} from "@/components/admin/InnerLayouts/InnerLayoutContext";
import {StyledBurgerButton} from "@/components/admin/navbar/navbar.styles";

export const BurgerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
