import styled from "styled-components";
import variables from "globalStyles/variables.scss";

export const StyledLeftContent = styled.div`
  border: 1px solid ${variables.colorBorder};
`;

export const StyledMainContentWrapper = styled.div`
  padding: 2rem;
  background: #fff;
  margin-top: 2rem;
  display: flex;
  border-radius: ${variables.borderRadius};

  .ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: transparent;
    color: inherit;
  }
`;

export const StyledMenuWrapper = styled.div`
  .ant-menu-dark {
    color: #000;
    background: #fff;
    margin: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${variables.colorBorder};
  }
`;

export const StyledStatusGroup = styled.div`
  padding: 0 2rem 2rem calc(2rem + 24px);

  > div {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }

  span {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    border-radius: 50%;
    display: flex;
    margin-right: 0.8rem;
    align-items: center;
  }
`;

export const StyledStatus1 = styled.span`
  background: ${variables.colorSuccess};
`;

export const StyledStatus2 = styled.span`
  background: ${variables.colorPending};
`;

export const StyledStatus3 = styled.span`
  background: ${variables.colorWarning};
`;

export const StyledRightContent = styled.div`
  padding: 2rem;
  width: 100%;
  border: 1px solid ${variables.colorBorder};
`;

export const StyledRightContentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-btn-default {
    margin-left: 1rem;
  }

  button {
    display: flex;
    align-items: center;
  }
`;

export const StyledFolderIcon = styled.div`
  padding: 2rem 0;
  width: 6rem;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46'%3E%3Cg id='Group_3' data-name='Group 3' transform='translate(-566.5 -92.5)'%3E%3Crect id='Rectangle_4' data-name='Rectangle 4' width='24' height='39' rx='3' transform='translate(584 94)' fill='%23bbc5d2' stroke='%23aab7c7' stroke-width='1'/%3E%3Cpath id='Rectangle_3' data-name='Rectangle 3' d='M3,0H21a3,3,0,0,1,3,3V36a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0Z' transform='translate(571 93)' fill='%23bbc5d2' stroke='%23aab7c7' stroke-width='1'/%3E%3Crect id='Rectangle_2' data-name='Rectangle 2' width='41' height='41' rx='3' transform='translate(569 97)' fill='%23d6dde7' stroke='%23aab7c7' stroke-width='1'/%3E%3Cpath id='Rectangle_5' data-name='Rectangle 5' d='M3,0H42a3,3,0,0,1,3,3V34a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0Z' transform='translate(567 101)' fill='%23c7cfda' stroke='%23aab7c7' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E%0A");
`;

export const StyledFolderList = styled.div`
  margin-top: 2rem;
`;

export const StyledFolderItem = styled.div`
  border: 1px solid ${variables.colorBorder};
  padding: 2rem;
  border-radius: ${variables.borderRadius};
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const StyledFolderText = styled.div`
  line-height: 2.1rem;
  font-size: 1.2rem;
  color: ${variables.colorSubText};
`;
