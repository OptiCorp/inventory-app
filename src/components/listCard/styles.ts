import { styled } from 'styled-components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export const ResultCard = styled.div`
  position: relative;
  padding: 8px;
    background-color: white;
  &:hover {
    background: whitesmoke;
  }
    cursor: pointer;
    max-width: 450px;
  border-radius: 6px;
    box-shadow: 2.5px 2.5px gray;
  width: 95%;

`

export const Title = styled.h2`
  margin: 0px;
  padding: 0px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `


export const DeleteWrapper = styled(DeleteForeverIcon)`
  color: black;
  position: absolute;
  top: -12px;
  right: -3px;
  &:hover {
    color: red;
  }

`

