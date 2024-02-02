import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import apiService from '../../api';
import { AddDocument } from '../../apiTypes';

export const useUploadDocumentToItem = (itemId: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    const { setSnackbarText } = useContext(AppContext);
    return useMutation({
        mutationFn: async (document: AddDocument) => await api.addDocument(document, itemId),
        onSettled: (_data, errors, document) => {
            if (!errors) {
                setSnackbarText(`${document.file.name} was uploaded.`);
                queryClient
                    .invalidateQueries({
                        queryKey: [itemId],
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
