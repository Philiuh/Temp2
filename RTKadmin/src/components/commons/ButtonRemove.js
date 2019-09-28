import styled from 'styled-components'
import SvgRemove from '@material-ui/icons/Close'

const ButtonRemove = styled(SvgRemove)`
  cursor: pointer;
  padding: 10px;
  transition: 0.225s;
  transform-origin: center center;
  &:hover {
    transform: scale(1.1);
  }
`
export default ButtonRemove
