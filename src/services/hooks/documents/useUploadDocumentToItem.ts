import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import apiService from '../../api';
import { AddDocument } from '../../apiTypes';

export const useUploadDocumentToItem = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    const { setSnackbarText } = useContext(AppContext);
    return useMutation({
        mutationFn: async (variables: { document: AddDocument; itemId: string }) =>
            await api.addDocumentToItem(variables.document, variables.itemId),
        onSettled: (_data, errors, variables) => {
            if (!errors) {
                setSnackbarText(`${variables.document.file.name} was uploaded.`);
                queryClient
                    .invalidateQueries({
                        queryKey: [variables.itemId],
                    })
                    .catch((error) => {
                        console.error('Failed to invalidate queries.', error);
                    });
                return;
            }
            setSnackbarText('Document could not be uploaded.');
        },
    });
};
