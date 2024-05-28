import {
  HomeOutlined,
  DollarOutlined,
  MoneyCollectOutlined,
  BlockOutlined,
  UserOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import LogoIcon from "assets/icons/LogoIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sider = ({ collapsed }) => {
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
    localStorage.setItem("currentScreen", e.key);
  };

  const { Sider } = Layout;

  const [current, setCurrent] = useState(localStorage.getItem("currentScreen"));

  let width = collapsed ? "60pt" : "150pt";
  let height = collapsed ? "10pt" : "25pt";

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={collapsed ? 80 : 260}
    >
      <div
        className="logo"
        style={{
          margin: "2.4rem 0",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => {
          navigate("/dash/contract");
          setCurrent("/dash/contract");
          localStorage.setItem("currentScreen", "/dash/contract");
        }}
      >
        <LogoIcon width={width} height={height} />
      </div>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={["/dash/contract"]}
        onClick={onClick}
        selectedKeys={[current]}
        items={[
          {
            // key: "/dash/contract",
            icon: <HomeOutlined />,
            label: "Contract",
            children: [
              // {
              //   key: "/dash/contract/1",
              //   label: "Add Contract",
              // },
              {
                key: "/dash/contract/list",
                label: "List Contract",
              },
            ],
          },

          {
            key: "/dash/payment-plan",
            icon: <DollarOutlined />,
            label: "Payment Plan",
          },

          {
            key: "/dash/payment-actual",
            icon: <MoneyCollectOutlined />,
            label: "Payment Actual",
          },

          // {
          //   key: "/dash/budget",
          //   icon: <BlockOutlined />,
          //   label: "Budget",
          // },

          // {
          //   key: "/dash/po",
          //   icon: <HomeOutlined />,
          //   label: "PO",
          // },

          // {
          //   key: "/dash/cost-control",
          //   icon: <ControlOutlined />,
          //   label: "Cost Control",
          // },

          {
            key: "/dash/role",
            icon: <UserOutlined />,
            label: "Quản lý vai trò",
          },
        ]}
      />
    </Sider>
  );
};

export default Sider;
