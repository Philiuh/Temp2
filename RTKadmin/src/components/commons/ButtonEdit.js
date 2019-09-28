import styled from 'styled-components'
import SvgEdit from '@material-ui/icons/Edit'

const ButtonEdit = styled(SvgEdit)`
  cursor: pointer;
  padding: 10px;
  transition: 0.225s;
  transform-origin: center center;
  &:hover {
    transform: scale(1.1);
  }
`
export default ButtonEdit
