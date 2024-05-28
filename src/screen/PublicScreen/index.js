import {Button} from 'antd'
import {useNavigate} from 'react-router-dom'
import {PublicScreenWrapper, StyledText} from './styles'

const PublicScreen = ({token}) => {
  const navigate = useNavigate()

  return (
    <PublicScreenWrapper>
      <StyledText>WELCOME TO AMECC SYSTEM</StyledText>

      <div>
        <Button type='primary' onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </PublicScreenWrapper>
  )
}

export default PublicScreen
