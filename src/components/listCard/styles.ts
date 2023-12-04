import { styled } from 'styled-components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ListWrapper = styled.div`
  position: relative;
  padding: 8px;
  background-color: white;
  &:hover {
    background: whitesmoke;
  }
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 2.5px 2.5px gray;
  width: 95%;
  max-width: 450px;
`

export const StyledTitle = styled.h2`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const StyledDeleteIcon = styled(DeleteForeverIcon)`
  color: black;
  position: absolute;
  top: -12px;
  right: -3px;
  &:hover {
    color: red;
  }
`

