import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import apiService from '../../api';
import { AddDocument } from '../../apiTypes';

type UploadObject = {
    document: AddDocument;
    itemId: string;
};

export const useUploadDocumentToItem = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    const { setSnackbarText } = useContext(AppContext);
    return useMutation({
        mutationFn: async (upload: UploadObject) =>
            await api.addDocumentToItem(upload.document, upload.itemId),
        onSettled: (_data, errors, upload) => {
            if (!errors) {
                setSnackbarText(`${upload.document.file.name} was uploaded.`);
                queryClient
                    .invalidateQueries({
                        queryKey: [upload.itemId],
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
