import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashSider from "./DashSider";
import { DashLayoutContainer, StyledOutletWrapper } from "./styles";

const DashLayout = ({ colorBgContainer }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DashLayoutContainer collapsed={collapsed}>
      <Layout>
        <DashSider collapsed={collapsed} />

        <Layout className="site-layout">
          <StyledOutletWrapper collapsed={collapsed}>
            <Outlet />
          </StyledOutletWrapper>
        </Layout>
      </Layout>
    </DashLayoutContainer>
  );
};
export default DashLayout;
