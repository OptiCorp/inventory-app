import { FunctionComponent } from 'react'
import { styled } from 'styled-components'
interface ButtonProps {
    children: React.ReactNode
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
    form?: string
    id?: string
}
export const SubmitButton = styled.button`
    &:active {
        transform: scale(1.03);
    }
    &:hover {
    }
    width: 150px;
    background-color: black;
    color: white;
    height: 30px;
    cursor: pointer;
    margin-inline: auto;
`

export const Wrapper = styled.div`
    display: flex;
    justify-content: end;
    padding: 1rem;
`

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type,
    onClick,
    id,
    form,
}) => {
    return (
        <Wrapper>
            <SubmitButton onClick={onClick} id={id} type={type} form={form}>
                {children}
            </SubmitButton>
        </Wrapper>
    )
}
