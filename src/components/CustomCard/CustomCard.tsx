import { FunctionComponent } from 'react';
import { useWindowDimensions } from '../../hooks';
import { StyledCompactLists, StyledInfoDiv, StyledLists, StyledTitle } from './styles';

interface CardProps {
    children: React.ReactNode;
    title: string;
    onClick?: () => void;
}

export const Card: FunctionComponent<CardProps> = ({ children, title, onClick }) => {
    const { width } = useWindowDimensions();
    return (
        <>
            <StyledInfoDiv onClick={onClick}>
                {width > 800 ? (
                    <StyledLists>
                        <StyledTitle>{title}</StyledTitle>
                        {children}
                    </StyledLists>
                ) : (
                    <StyledCompactLists>
                        <StyledTitle>{title}</StyledTitle>
                        {children}
                    </StyledCompactLists>
                )}
            </StyledInfoDiv>
        </>
    );
};
