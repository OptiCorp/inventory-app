import { useWindowDimensions } from '../../hooks/useWindowDimensions';

interface ResponsiveRouteProps {
    desktopElement: React.ReactNode;
    mobileElement: React.ReactNode;
}

export const ResponsiveRoute: React.FC<ResponsiveRouteProps> = ({
    desktopElement,
    mobileElement,
}) => {
    const { width } = useWindowDimensions();

    return width > 800 ? desktopElement : mobileElement;
};
