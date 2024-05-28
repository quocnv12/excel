import {Tag} from 'antd'
import {StyledTagWraper} from './styles'

const TagTable = ({background, color, border, text}) => {
  return (
    <StyledTagWraper background={background}>
      <Tag
        style={{
          background: background,
          color: color,
          border: border,
          borderRadius: '9999px',
        }}>
        {text}
      </Tag>
    </StyledTagWraper>
  )
}

export default TagTable
