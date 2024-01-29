import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import UmAppContext from '../../../contexts/UmAppContext';
import apiService from '../../api';

export const useDeleteDocument = (itemId: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    const { setSnackbarText } = useContext(UmAppContext);
    return useMutation({
        mutationFn: (documentId: string) => api.deleteDocument(documentId),
        onSettled(_data, error) {
            error ? setSnackbarText(error.message) : setSnackbarText('Document deleted');
            queryClient
                .invalidateQueries({
                    queryKey: [itemId],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries', error);
                });
        },
    });
};
