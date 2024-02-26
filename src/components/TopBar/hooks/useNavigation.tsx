import { useMsal } from '@azure/msal-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useNavigationControl = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { listId } = useParams();
    const { instance } = useMsal();
    const handleBack = () => {
        if (location.pathname === '/add-item/checks') {
            navigate('/add-item/batch');
        } else if (location.pathname === '/add-item/upload') {
            navigate('/add-item/checks');
        } else if (location.pathname === '/add-item/add-form') {
            navigate('/add-item/upload');
        } else if (location.pathname === `/make-list/${listId}`) {
            navigate('/make-list');
        } else if (location.pathname === '/add-item/batch') {
            navigate('/add-item');
        } else {
            navigate(-1);
        }
    };

    const handleSearchIconClick = () => {
        navigate('/search', {
            state: { resetInputField: true },
        });
    };

    const adminLinks = (location: string) => {
        navigate(location);
    };
    const handleSignOut = () => {
        navigate('/');
        instance.logoutPopup().catch((e) => {
            console.error(e);
        });
    };

    return {
        handleBack,
        handleSearchIconClick,
        adminLinks,
        handleSignOut,
    };
};
