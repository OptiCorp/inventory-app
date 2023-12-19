import { useState } from 'react'
import { AdminContainer, ButtonContainer, SearchResultContainer } from './styles'
import { useDebounce } from 'usehooks-ts'
import { useGetVendorsInfinite } from '../../services/hooks/Vendor/useGetVendorInfinite'
import SearchBar from '../../components/searchBar/SearchBar'
import AdminSearchCard, { SearchType } from '../../components/admin/AdminSearchCard'
import { Button } from '../../components/Button/SubmitButton'

const Vendors = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetVendorsInfinite(debouncedSearchTerm)

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for vendor"
            />

            <SearchResultContainer>
                {data?.pages.map((page, i) =>
                    page.map((vendor, index) => (
                        <div
                            id={
                                i === data.pages.length - 1 && index === page.length - 1
                                    ? 'lastItem'
                                    : ''
                            }
                            key={vendor.id}
                        >
                            <AdminSearchCard searchType={SearchType.Vendor} data={vendor} />
                        </div>
                    ))
                )}
            </SearchResultContainer>

            <ButtonContainer>
                <Button children={'Add new vendor'} backgroundColor={'black'} color={'white'} />
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Vendors
