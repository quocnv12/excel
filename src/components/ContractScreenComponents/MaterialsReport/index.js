import { DatePicker, Space, theme } from "antd";
import MaterialsReportIcon1 from "assets/icons/MaterialsReportIcon1";
import MaterialsReportIcon2 from "assets/icons/MaterialsReportIcon2";
import MaterialsReportIcon3 from "assets/icons/MaterialsReportIcon3";
import { StyledTitleSection } from "globalStyles/styles";
import CardItem from "./CardItem";
import { StyledCardList, StyledHeaderWrapper } from "./styles";
import variables from "globalStyles/variables.scss";
import MaterialsReportIcon4 from "assets/icons/MaterialsReportIcon4";
import { useTranslation } from "react-i18next";

const MaterialsReport = () => {
  const { RangePicker } = DatePicker;
  const {
    token: { colorError },
  } = theme.useToken();

  const { t } = useTranslation(["generalScreen"]);

  return (
    <div>
      <StyledHeaderWrapper>
        <StyledTitleSection>{t("title")}</StyledTitleSection>

        <Space direction="vertical" size={8}>
          <RangePicker />
        </Space>
      </StyledHeaderWrapper>

      <StyledCardList>
        <CardItem
          icon={<MaterialsReportIcon1 />}
          color={variables.colorPrimary20}
          text={`${t("headerCard.card1")}`}
          colorPercent={colorError}
          titleTooltip="Lorem"
          percent="26.6%"
        />

        <CardItem
          icon={<MaterialsReportIcon2 />}
          color={variables.colorPending20}
          text={`${t("headerCard.card2")}`}
          colorPercent={colorError}
          titleTooltip="Lorem"
          percent="26.6%"
        />
        <CardItem
          icon={<MaterialsReportIcon3 />}
          color={variables.colorWarning20}
          text={`${t("headerCard.card3")}`}
          colorPercent={colorError}
          titleTooltip="Lorem"
          percent="26.6%"
        />
        <CardItem
          icon={<MaterialsReportIcon4 />}
          color={variables.colorSuccess20}
          text={`${t("headerCard.card4")}`}
          colorPercent={colorError}
          titleTooltip="Lorem"
          percent="26.6%"
        />
      </StyledCardList>
    </div>
  );
};

export default MaterialsReport;
