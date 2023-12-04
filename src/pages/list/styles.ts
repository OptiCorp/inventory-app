import { styled } from "styled-components";

export const SubmitButton = styled.button`
  width: 150px;
  background-color: black;
  color: white;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`

export const CancelButton = styled.button`
  width: 150px;
  background-color: white;
  color: black;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
`

export const SavedListsTitle = styled.h3`
  font-weight: 600;
  line-height: 2rem;
  margin: 15px 0 5px 15px;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 10px;
`