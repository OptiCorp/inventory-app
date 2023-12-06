import { styled } from 'styled-components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
  max-width: 450px;
  @media (max-width: 500px) {
    width: 305px;
  }
`

export const StyledTitle = styled.h2`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const StyledDeleteIconAbsolute = styled(DeleteForeverIcon)`
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    color: red;
  }
`

export const StyledDeleteIconRelative = styled(DeleteForeverIcon)`
  color: black;
  position: relative;
  top: 0;
  right: 0;
  &:hover {
    color: red;
  }
  margin-left: auto;
`

export const StyledAddIcon = styled(AddCircleIcon)`
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    color: green;
  }
  cursor: pointer;
`

export const StyledRemoveIcon = styled(RemoveCircleIcon)`
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    color: red;
  }
  cursor: pointer;
`