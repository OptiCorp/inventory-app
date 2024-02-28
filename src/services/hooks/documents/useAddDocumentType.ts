import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { DocumentType } from '../../apiTypes';

export const useAddDocumentType = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (documentType: Pick<DocumentType, 'description' | 'name'>) =>
            api.addDocumentType(documentType),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['documentType'],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
        },
    });
};
