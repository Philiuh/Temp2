import React from 'react'
import styled from 'styled-components'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import SvgPlay from '@material-ui/icons/PlayCircleOutline'
import SvgStop from '@material-ui/icons/PauseCircleOutline'

import { ButtonRemove, ButtonEdit } from '../commons'
import { likesNormiliser } from '../../utils'

const BaseButtonAnimationMixin = `
  transition: 0.225s;
  transform-origin: center center;
  &:hover {
    transform: scale(1.1);
  }
`

const ButtonPlay = styled(SvgPlay)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  ${BaseButtonAnimationMixin};
`

const ButtonStop = styled(SvgStop)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  ${BaseButtonAnimationMixin};
`

const TagText = styled.span`
  border-radius: 5px;
  background-color: #3f51b5;
  padding: 2px 5px;
  color: #fff;
  margin: 0 0 5px 5px;
`

const TagWrapper = styled.div`
  padding-top: 5px;
  margin-left: -5px;
  display: flex;
  flex-wrap: wrap;
`

const Image = styled.img`
  width: 50px;
  height: 50px;

  margin-left: 10px;
`

const PostItem = ({
  id,
  title,
  tags,
  image,
  likes,
  onRemove,
  isPlaying,
  onPlay,
  onUpdatePress,
}) => (
  <TableRow>
    <TableCell children={id} />
    <TableCell children={title} />
    <TableCell>
      {isPlaying && <ButtonStop onClick={() => onPlay(id)} />}
      {!isPlaying && <ButtonPlay onClick={() => onPlay(id)} />}
    </TableCell>
    <TableCell>
      <TagWrapper>
        {tags.map(tag => (
          <TagText key={tag} children={tag} />
        ))}
      </TagWrapper>
    </TableCell>
    <TableCell>
      <Image src={image} />
    </TableCell>
    <TableCell children={likesNormiliser(likes)} />
    <TableCell>
      <ButtonRemove onClick={() => onRemove(id)} />
      <ButtonEdit
        onClick={() => {
          onUpdatePress(id)
        }}
      />
    </TableCell>
  </TableRow>
)

export default PostItem
