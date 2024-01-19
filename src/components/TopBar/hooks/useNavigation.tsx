import { useMsal } from '@azure/msal-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const useNavigationControl = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { listId } = useParams();
    const { instance } = useMsal();
    const handleBack = () => {
        if (location.pathname === '/add-part/checks') {
            navigate('/add-part/batch');
        } else if (location.pathname === '/add-part/upload') {
            navigate('/add-part/checks');
        } else if (location.pathname === '/add-part/add-form') {
            navigate('/add-part/upload');
        } else if (location.pathname === `/makelist/${listId}`) {
            navigate('/makelist');
        } else if (location.pathname === '/add-part/batch') {
            navigate('/add-part');
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

export default useNavigationControl;
