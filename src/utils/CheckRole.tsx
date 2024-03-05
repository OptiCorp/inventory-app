import { User } from '../services/apiTypes';

export const CheckRole = ({ currentUser }: { currentUser: User | null }) => {
    const isInspector = () => currentUser?.userRole.name === 'Inspector' || false;

    return {
        isInspector,
    };
};
