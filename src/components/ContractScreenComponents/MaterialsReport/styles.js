import styled from "styled-components";
import variables from "globalStyles/variables.scss";

export const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding: 2rem 0;
`;

export const StyledCard = styled.div`
  display: flex;
`;

export const StyledCardWrapper = styled.div`
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: ${variables.boxShadow};
`;

export const StyledCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const StyledCardTopIcon = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => (props.color ? props.color : "")};
`;

export const StyledCardNumber = styled.div`
  line-height: 2.5rem;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const StyledCardPercent = styled.div`
  color: ${(props) => (props.color ? props.color : "")};
`;

export const StyledCardText = styled.div`
  color: ${variables.colorSubText};
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
