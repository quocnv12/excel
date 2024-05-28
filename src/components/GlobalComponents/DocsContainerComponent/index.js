import { Button, Input, Menu } from "antd";
import {
  StyledFolderIcon,
  StyledFolderItem,
  StyledFolderList,
  StyledFolderText,
  StyledLeftContent,
  StyledMainContentWrapper,
  StyledMenuWrapper,
  StyledRightContent,
  StyledRightContentHeader,
  StyledStatus1,
  StyledStatus2,
  StyledStatus3,
  StyledStatusGroup,
} from "./styles";

import DropdownAction from "./DropdownAction";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const DocsContainerComponent = ({ items, folderList }) => {
  const { t } = useTranslation(["docsScreen"]);

  return (
    <StyledMainContentWrapper>
      <StyledLeftContent>
        <StyledMenuWrapper>
          <Menu
            style={{
              width: 256,
            }}
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items}
            theme="dark"
          />
        </StyledMenuWrapper>

        <StyledStatusGroup>
          <div>
            <StyledStatus1></StyledStatus1>
            <div>{t("leftMenu.status1")}</div>
          </div>

          <div>
            <StyledStatus2></StyledStatus2>
            <div>{t("leftMenu.status2")}</div>
          </div>

          <div>
            <StyledStatus3></StyledStatus3>
            <div>{t("leftMenu.status3")}</div>
          </div>
        </StyledStatusGroup>
      </StyledLeftContent>

      <StyledRightContent>
        <StyledRightContentHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="primary"
              icon={<MdOutlineCreateNewFolder size={20} />}
            >
              &nbsp; {t("btnGroup.btn3")}
            </Button>
            <Button icon={<BsPersonPlus size={20} />}>
              &nbsp; {t("btnGroup.btn4")}
            </Button>
          </div>

          <div>
            <Input placeholder={`${t("searchBox")}`} />
          </div>
        </StyledRightContentHeader>

        <StyledFolderList>
          {folderList.map((el) => {
            return (
              <StyledFolderItem>
                <div>
                  <StyledFolderIcon></StyledFolderIcon>

                  <StyledFolderText key={el.id}>
                    <div>{el.title}</div>
                    <div>
                      {t("folderContent.updatedDate")} {el.date}
                    </div>
                  </StyledFolderText>
                </div>

                <div>
                  <DropdownAction />
                </div>
              </StyledFolderItem>
            );
          })}
        </StyledFolderList>
      </StyledRightContent>
    </StyledMainContentWrapper>
  );
};

export default DocsContainerComponent;
