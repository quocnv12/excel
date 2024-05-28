import { Button } from "antd";
import { StyledTitleSection } from "globalStyles/styles";
import { useTranslation } from "react-i18next";
import { BsUpload } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { StyledHeaderWrapper } from "./styles";

const HeaderDocsSection = ({ title }) => {
  const { t } = useTranslation(["common"]);

  return (
    <div>
      <StyledHeaderWrapper>
        <StyledTitleSection>{title}</StyledTitleSection>

        <div>
          <Button type="primary" icon={<BsUpload />}>
            &nbsp; {t("globalBtn.uploadFile")}
          </Button>
          <Button icon={<IoSettingsOutline />}>
            {" "}
            &nbsp;{t("globalBtn.settings")}
          </Button>
        </div>
      </StyledHeaderWrapper>
    </div>
  );
};

export default HeaderDocsSection;
