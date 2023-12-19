import { useDebounce } from 'usehooks-ts'
import { useGetLocationsInfinite } from '../../services/hooks/Locations/useGetLocationsInfinite'
import { AdminContainer, ButtonContainer, SearchResultContainer } from './styles'
import { useState } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import AdminSearchCard, { SearchType } from '../../components/admin/AdminSearchCard'
import { Button } from '../../components/Button/SubmitButton'

const Locations = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetLocationsInfinite(debouncedSearchTerm)

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for location"
            />
            <SearchResultContainer>
                {data?.pages.map((page, i) =>
                    page.map((location, index) => (
                        <div
                            id={
                                i === data.pages.length - 1 && index === page.length - 1
                                    ? 'lastItem'
                                    : ''
                            }
                        >
                            <AdminSearchCard searchType={SearchType.Location} data={location} />
                        </div>
                    ))
                )}
            </SearchResultContainer>
            <ButtonContainer>
                <Button children={'Add new location'} backgroundColor={'black'} color={'white'} />
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Locations
