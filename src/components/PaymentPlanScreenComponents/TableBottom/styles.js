import styled from 'styled-components'
import variables from 'globalStyles/variables.scss'

export const StyledProjectReport = styled.div`
  .ant-table-cell {
    color: ${variables.colorSubText};
  }

  .ant-table-wrapper .ant-table-tbody > tr > td,
  .ant-table-wrapper tfoot > tr > td {
    position: relative;
    padding: 12px 12px;
    overflow-wrap: break-word;
  }
`

export const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;

  .ant-btn {
    margin-left: 1rem;
  }
`
