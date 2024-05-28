import styled from "styled-components";
import variables from "globalStyles/variables.scss";

export const DashLayoutContainer = styled.div`
  position: relative;

  .ant-layout .ant-layout-sider {
    background: ${variables.colorPrimary};
    color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }

  .ant-layout .ant-layout-header {
    line-height: 2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: ${(props) => (props.collapsed ? "80px" : "260px")};
    z-index: 1000;
    box-shadow: rgba(23, 25, 26, 0.1) 4px 4px 10px;
  }

  .ant-menu-submenu-title,
  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open
    > .ant-menu-submenu-title {
    color: #fff;
  }

  .ant-menu-light {
    background: ${variables.colorPrimary};
    color: #fff;
  }

  .ant-menu-light .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: #fff;
  }

  .ant-menu-light
    .ant-menu-item:hover:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ),
  .ant-menu-light
    .ant-menu-submenu-title:hover:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ) {
    color: #fff;
  }

  .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light {
    height: calc(100vh - 60px);
    overflow-y: scroll;
    padding-bottom: 4rem;
  }

  section {
    min-height: 100vh;
  }
`;

export const StyledOutletWrapper = styled.div`
  padding: 2rem;
  margin-left: ${(props) => (props.collapsed ? "80px" : "260px")};
  margin-top: 8rem;
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  > div {
    display: flex;
    align-items: center;
  }

  .ant-dropdown-trigger {
    display: flex;
    cursor: pointer;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: #ffffff;
    border: 1px solid transparent;
  }

  .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(
      .ant-pagination-size-changer
    ):hover
    .ant-select-selector {
    border-color: transparent;
  }

  .ant-select-focused.ant-select:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer)
    .ant-select-selector {
    border-color: transparent;
    box-shadow: 0 0 0 2px transparent;
  }

  .ant-select-selection-item span {
    display: flex;
    align-items: center;

    img {
      margin-right: 1rem;
    }
  }
`;

export const StyledBreadcrumbs = styled.div`
  padding-left: 1rem;
`;

export const SpinContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100000000000000;
  display: flex;
  align-items: center;
  width: 100% !important;

  .ant-spin.ant-spin-lg.ant-spin-spinning {
    position: absolute;
    z-index: 1000000000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
