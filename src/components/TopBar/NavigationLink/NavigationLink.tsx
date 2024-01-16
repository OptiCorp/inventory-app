import { ReactNode } from 'react';
import { StyledLinkDiv, StyledNavLink } from './styles';

type NavigationLinkProps = {
    to: string;
    children: ReactNode;
};

export const NavigationLink = ({ to, children }: NavigationLinkProps) => (
    <StyledNavLink to={to}>
        <StyledLinkDiv>{children}</StyledLinkDiv>
    </StyledNavLink>
);
