import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { DocumentType } from '../../apiTypes';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import { handleApiRequestSnackbar } from '../../../utils/handleApiRequestSnackbar';

export const useAddDocumentType = () => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (documentType: Pick<DocumentType, 'description' | 'name'>) =>
            api.addDocumentType(documentType),
        onSettled: (_data, _, documentType) => {
            if (_data) {
                handleApiRequestSnackbar(
                    _data,
                    `Added document type: ${documentType.name}`,
                    setSnackbarSeverity,
                    setSnackbarText
                );
                queryClient
                    .invalidateQueries({
                        queryKey: ['documentType'],
                    })
                    .catch((error) => {
                        console.error('Failed to invalidate queries: ', error);
                    });
            }
        },
    });
};
