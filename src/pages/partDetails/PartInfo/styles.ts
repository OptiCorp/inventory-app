import EditIcon from '@mui/icons-material/Edit'
import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    padding: 20px;
    gap: 15px;
    grid-template-columns: repeat(1, 1fr);

    @media only screen and (min-width: 550px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (min-width: 850px) {
        grid-template-columns: repeat(4, 1fr);
    }
`
export const InfoContainer = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
    p {
        margin: 0;
    }
`

export const Edit = styled(EditIcon)`
    cursor: pointer;

    &:hover {
        color: #ff001e;
    }
`
export const ButtonContainer = styled.div`
    display: flex;
    padding-left: 10px;
    padding-top: 20px;
    justify-content: flex-end;
`
