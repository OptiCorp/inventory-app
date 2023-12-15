import { useState } from 'react'
import { AdminContainer, ButtonContainer, SearchResultContainer } from './styles'
import { useDebounce } from 'usehooks-ts'
import { useGetVendorsInfinite } from '../../services/hooks/Vendor/useGetVendorInfinite'
import SearchBar from '../../components/searchBar/SearchBar'
import AdminSearchCard from '../../components/admin/AdminSearchCard'
import { Button } from '../../components/Button/SubmitButton'

const Vendors = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetVendorsInfinite(debouncedSearchTerm)

    const fakeData = {
        pages: [
            [
                {
                    id: 'ksdh357gf',
                    name: 'Vendor 1',
                    userId: 'Henrik Laland',
                },
                {
                    id: 'dsfh54',
                    name: 'Vendor 2',
                    userId: 'Henrik Laland',
                },
                {
                    id: 'dshf54',
                    name: 'Vendor 3',
                    userId: 'Henrik Laland',
                },
                {
                    id: 'ksdh35dhet43t7gf',
                    name: 'Vendor 4',
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
                placeholder="Search for vendor"
            />

            <SearchResultContainer>
                {fakeData?.pages.map((page, i) =>
                    page.map((vendor, index) => <AdminSearchCard data={vendor} />)
                )}
            </SearchResultContainer>

            <ButtonContainer>
                <Button children={'Add new vendor'} backgroundColor={'black'} color={'white'} />
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Vendors
