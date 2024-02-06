import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { useContext } from 'react';
import UmAppContext from '../../../contexts/AppContext';
import { AddDocument } from '../../apiTypes';

export const useUploadDocumentToItemTemplate = (templateId: string, itemId: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    const { setSnackbarText } = useContext(UmAppContext);
    return useMutation({
        mutationFn: async (document: AddDocument) =>
            await api.addDocumentToItemTemplate(document, templateId),
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
