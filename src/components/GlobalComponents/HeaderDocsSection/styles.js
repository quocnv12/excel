import styled from "styled-components";

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-btn-default {
    margin-left: 1rem;
  }
`;

export const StyledFilterSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 5rem;
  grid-gap: 3rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const StyledFilterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLabel = styled.div`
  padding-right: 2rem;
`;
