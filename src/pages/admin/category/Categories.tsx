import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import AdminSearchCard from '../../../components/AdminSearchCard/AdminSearchCard';
import { Button } from '../../../components/Button/Button';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Category } from '../../../services/apiTypes';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { SearchType } from '../../../utils/constant';
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles';

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: initialData } = useGetCategories();
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState<Category[]>([]);

    useEffect(() => {
        if (initialData) {
            setFilteredData(
                initialData.filter((category) =>
                    category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            );
        }
    }, [initialData, debouncedSearchTerm]);

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for category"
            />
            <SearchResultContainer>
                {filteredData?.map((category, i) => (
                    <div id={i === filteredData.length - 1 ? 'lastItem' : ''} key={category.id}>
                        <AdminSearchCard searchType={SearchType.Category} data={category} />
                    </div>
                ))}
            </SearchResultContainer>
            <ButtonContainer>
                <Button onClick={() => navigate('/admin/add-category')} variant="black">
                    Add new category
                </Button>
            </ButtonContainer>
        </AdminContainer>
    );
};

export default Categories;
