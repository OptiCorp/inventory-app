import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { DocumentType } from '../../apiTypes';

export const useUpdateDocumentType = (id: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (documentType: Pick<DocumentType, 'id' | 'name'>) =>
            api.updateDocumentTypeById(id, documentType),
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
