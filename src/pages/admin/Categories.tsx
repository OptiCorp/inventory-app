import { useState } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import { AdminContainer, ButtonContainer, SearchResultContainer } from './styles'
import { useDebounce } from 'usehooks-ts'
import { useGetCategoriesInfinite } from '../../services/hooks/Category/useGetCategoriesInfinite'
import { Category } from '../../services/apiTypes'
import AdminSearchCard from '../../components/admin/AdminSearchCard'
import { Button } from '../../components/Button/SubmitButton'

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetCategoriesInfinite(debouncedSearchTerm)

    const fakeData = {
        pages: [
            [
                {
                    id: 'ksdh357gf',
                    name: 'Category 1',
                    userId: 'Henrik Laland',
                },
                {
                    id: 'dsfh54',
                    name: 'Category 2',
                    userId: 'Henrik Laland',
                },
                {
                    id: 'dshf54',
                    name: 'Category 3',
                    userId: 'Henrik Laland',
                },
                {
                    id: 'ksdh35dhet43t7gf',
                    name: 'Category 4',
                    userId: 'Henrik Laland',
                },
            ],
        ],
    }

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for category"
            />
            <SearchResultContainer>
                {fakeData?.pages.map((page, i) =>
                    page.map((category, index) => <AdminSearchCard data={category} />)
                )}
            </SearchResultContainer>
            <ButtonContainer>
                <Button children={'Add new category'} backgroundColor={'black'} color={'white'} />{' '}
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Categories
