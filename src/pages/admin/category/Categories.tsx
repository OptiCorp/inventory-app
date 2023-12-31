import { useEffect, useState } from 'react'
import SearchBar from '../../../components/searchBar/SearchBar'
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles'
import { useDebounce } from 'usehooks-ts'
import { useGetCategoriesInfinite } from '../../../services/hooks/Category/useGetCategoriesInfinite'
import AdminSearchCard, { SearchType } from '../../../components/admin/AdminSearchCard'
import { Button } from '../../../components/Button/SubmitButton'
import { useNavigate } from 'react-router-dom'
import { useGetCategories } from '../../../services/hooks/Category/useGetCategories'
import { Category } from '../../../services/apiTypes'

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data: initialData } = useGetCategories()
    const navigate = useNavigate()
    const [filteredData, setFilteredData] = useState<Category[]>([])

    useEffect(() => {
        if (initialData) {
            setFilteredData(
                initialData.filter((category) =>
                    category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            )
        }
    }, [initialData, debouncedSearchTerm])

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
                <Button
                    onClick={() => navigate('/admin/add-category')}
                    children={'Add new category'}
                    backgroundColor={'black'}
                    color={'white'}
                />{' '}
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Categories
