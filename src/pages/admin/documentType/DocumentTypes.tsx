import { useNavigate } from 'react-router-dom';
import { AdminSearchCard } from '../../../components/AdminSearchCard/AdminSearchCard';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles';
import { Button } from '@mui/material';
import { DocumentType } from '../../../services/apiTypes';
import { useEffect, useState } from 'react';
import { SearchType } from '../../../utils/constant';
import { useGetDocumentTypes } from '../../../services/hooks/documents/useGetDocumentTypes';
import { useDebounce } from 'usehooks-ts';

export const DocumentTypes = () => {
    const { data: initialData } = useGetDocumentTypes();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState<DocumentType[]>([]);

    useEffect(() => {
        if (initialData) {
            setFilteredData(
                initialData.filter((type) =>
                    type.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            );
        }
    }, [initialData, debouncedSearchTerm]);

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for document type"
            />
            <SearchResultContainer>
                {filteredData?.map((type, i) => (
                    <div id={i === filteredData.length - 1 ? 'lastItem' : ''} key={type.id}>
                        <AdminSearchCard searchType={SearchType.DocumentType} data={type} />
                    </div>
                ))}
            </SearchResultContainer>
            <ButtonContainer>
                <Button onClick={() => navigate('/admin/add-document-type')} variant="contained">
                    Add new document type
                </Button>
            </ButtonContainer>
        </AdminContainer>
    );
};
