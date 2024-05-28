import { Tooltip } from "antd";
import {
  StyledCardNumber,
  StyledCardPercent,
  StyledCardText,
  StyledCardTop,
  StyledCardTopIcon,
  StyledCardWrapper,
} from "./styles";

const CardItem = ({
  icon,
  color,
  percent,
  titleTooltip,
  colorPercent,
  text,
}) => {
  return (
    <StyledCardWrapper>
      <StyledCardTop>
        <StyledCardTopIcon color={color}>{icon}</StyledCardTopIcon>
        <Tooltip title={titleTooltip}>
          <StyledCardPercent color={colorPercent}>{percent}</StyledCardPercent>
        </Tooltip>
      </StyledCardTop>

      <StyledCardNumber>30.940.157,61</StyledCardNumber>
      <StyledCardText>{text}</StyledCardText>
    </StyledCardWrapper>
  );
};

export default CardItem;
