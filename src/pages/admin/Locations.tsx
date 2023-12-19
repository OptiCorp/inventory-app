import { useDebounce } from 'usehooks-ts'
import { useGetLocationsInfinite } from '../../services/hooks/Locations/useGetLocationsInfinite'
import { AdminContainer, ButtonContainer, SearchResultContainer } from './styles'
import { useState } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import AdminSearchCard, { AdminType } from '../../components/admin/AdminSearchCard'
import { Button } from '../../components/Button/SubmitButton'

const Locations = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetLocationsInfinite(debouncedSearchTerm)

    // const fakeData = {
    //     pages: [
    //         [
    //             {
    //                 id: 'ksdh357gf',
    //                 name: 'Location 1',
    //                 userId: 'Henrik Laland',
    //             },
    //             {
    //                 id: 'dsfh54',
    //                 name: 'Location 2',
    //                 userId: 'Henrik Laland',
    //             },
    //             {
    //                 id: 'dshf54',
    //                 name: 'Location 3',
    //                 userId: 'Henrik Laland',
    //             },
    //             {
    //                 id: 'ksdh35dhet43t7gf',
    //                 name: 'Location 4',
    //                 userId: 'Henrik Laland',
    //             },
    //         ],
    //     ],
    // }

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
                            <AdminSearchCard adminType={AdminType.Location} data={location} />
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
