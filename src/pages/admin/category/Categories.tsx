import { useState } from 'react'
import SearchBar from '../../../components/searchBar/SearchBar'
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles'
import { useDebounce } from 'usehooks-ts'
import { useGetCategoriesInfinite } from '../../../services/hooks/Category/useGetCategoriesInfinite'
import AdminSearchCard, { SearchType } from '../../../components/admin/AdminSearchCard'
import { Button } from '../../../components/Button/SubmitButton'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetCategoriesInfinite(debouncedSearchTerm)
    const navigate = useNavigate()

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for category"
            />
            <SearchResultContainer>
                {data?.pages.map((page, i) =>
                    page.map((category, index) => (
                        <div
                            id={
                                i === data.pages.length - 1 && index === page.length - 1
                                    ? 'lastItem'
                                    : ''
                            }
                            key={category.id}
                        >
                            <AdminSearchCard searchType={SearchType.Category} data={category} />
                        </div>
                    ))
                )}
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
