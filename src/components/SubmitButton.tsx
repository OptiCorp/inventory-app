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
    width: 150px;
    background-color: black;
    color: white;
    height: 30px;
    margin-inline: auto;
`

export const Wrapper = styled.button`
    display: flex;
    justify-content: end;
    max-width: '1000px';
    padding: '16px';
`

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type,
    onClick,
    id,
    form,
}) => {
    return (
        <SubmitButton onClick={onClick} id={id} type={type} form={form}>
            {children}
        </SubmitButton>
    )
}
