import styled from 'styled-components'

export const StyledTagWraper = styled.div`
  span {
    padding: 0.4rem 1.4rem;
    border: 1px solid ${(props) => (props.background ? props.background : '')};
  }
`
