import { FunctionComponent } from 'react'
import { SubmitButton, Wrapper } from './styles'
interface ButtonProps {
    children: React.ReactNode
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
    form?: string
    id?: string
    backgroundColor: string
    // variant: 'Primary' | 'Secondary' | 'Danger'
    color: string
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type,
    onClick,
    id,
    form,
    backgroundColor,
    color,
}) => {
    return (
        <Wrapper>
            <SubmitButton
                color={color}
                onClick={onClick}
                id={id}
                type={type}
                form={form}
                backgroundColor={backgroundColor}
            >
                {children}
            </SubmitButton>
        </Wrapper>
    )
}
