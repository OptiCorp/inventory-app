import { ComponentProps, FunctionComponent } from 'react';
import { COLORS } from '../../style/GlobalStyles';
import { SubmitButton } from './styles';
interface ButtonProps {
    variant: ButtonVariant;
    children?: React.ReactNode;
    type?: ComponentProps<'button'>['type'];
    onClick?: ComponentProps<'button'>['onClick'];
    form?: string;
    id?: string;
}

type ButtonVariant = 'black' | 'white' | 'red' | 'disabled';

const buttonStyles: Record<
    ButtonVariant,
    { backgroundColor: string; color: string; height: string; cursor?: string }
> = {
    black: {
        backgroundColor: COLORS.black,
        color: COLORS.white,
        height: '40px',
    },
    white: {
        backgroundColor: COLORS.white,
        color: COLORS.black,
        height: '40px',
    },
    red: {
        backgroundColor: COLORS.white,
        color: COLORS.red,
        height: '40px',
    },
    disabled: {
        backgroundColor: COLORS.gray,
        color: COLORS.darkGray,
        height: '40px',
        cursor: 'not-allowed',
    },
};

export const Button: FunctionComponent<ButtonProps> = ({
    variant,
    children,
    type,
    onClick,
    form,
    id,
}) => {
    const { backgroundColor, color, height } = buttonStyles[variant];

    return (
        <SubmitButton
            $backgroundColor={backgroundColor}
            color={color}
            height={height}
            type={type}
            onClick={onClick}
            form={form}
            id={id}
            variant={variant}
        >
            {children}
        </SubmitButton>
    );
};
