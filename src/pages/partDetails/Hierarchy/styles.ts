import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'
import RemoveIcon from '@mui/icons-material/Close'
import Add from '@mui/icons-material/Add'

export const AddIcon = styled(Add)<{ disabled: boolean }>`
    color: ${(props) => (props.disabled ? '#ddd' : COLORS.primary)};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        scale: 110%;
        color: ${(props) => (props.disabled ? '#ddd' : 'green')};
    }
`

export const CustomRemoveIcon = styled(RemoveIcon)`
    position: absolute;
    right: 0px;
    top: 2px;
    cursor: pointer;
    background-color: black;
    color: #fff;
    border-radius: 50%;
    font-size: 1.2rem !important;
    
    &:hover {
        color: red;
        scale: 110%;
    }
`

export const FlexContainer = styled.div`
    display: flex;
    gap: 10px;
`
export const ChildItemContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

`

export const LinkElement = styled.p`
    display: inline-block;
    border-bottom: 1px dotted ${COLORS.primary};
    cursor: pointer;
`
export const ChildItemSearchContainer = styled.div`
    display: flex;
    align-items: center;
`

export const AccessibleButtonWrapper = styled.button`
    border: none;
    background: transparent;
    margin: 0;
    cursor: pointer;

    &:hover {
        color: #ff001e;
    }
`