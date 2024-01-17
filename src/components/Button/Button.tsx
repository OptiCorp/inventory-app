import { ComponentProps, FunctionComponent } from 'react';
import { SubmitButton, Wrapper } from './styles';
interface ButtonProps {
    children?: React.ReactNode;
    type?: ComponentProps<'button'>['type'];
    onClick?: ComponentProps<'button'>['onClick'];
    form?: string;
    id?: string;
    backgroundColor: string;
    height?: string;
    color: ComponentProps<'button'>['color'];
}

export const Button: FunctionComponent<ButtonProps> = ({
    children,
    type,
    onClick,
    id,
    form,
    backgroundColor,
    color,
    height,
}) => {
    return (
        <Wrapper>
            <SubmitButton
                color={color}
                onClick={onClick}
                id={id}
                type={type}
                height={height}
                form={form}
                $backgroundColor={backgroundColor}
            >
                {children}
            </SubmitButton>
        </Wrapper>
    );
};
