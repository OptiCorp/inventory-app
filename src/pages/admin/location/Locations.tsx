import { useDebounce } from 'usehooks-ts'
import { useGetLocationsInfinite } from '../../../services/hooks/Locations/useGetLocationsInfinite'
import { AdminContainer, ButtonContainer, SearchResultContainer } from '../styles'
import { useEffect, useState } from 'react'
import SearchBar from '../../../components/searchBar/SearchBar'
import AdminSearchCard, { SearchType } from '../../../components/admin/AdminSearchCard'
import { Button } from '../../../components/Button/SubmitButton'
import { useNavigate } from 'react-router-dom'
import { useGetLocations } from '../../../services/hooks/Locations/useGetLocations'
import { Location } from '../../../services/apiTypes'

const Locations = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data: initialData } = useGetLocations()
    const [filteredData, setFilteredData] = useState<Location[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (initialData) {
            setFilteredData(
                initialData.filter((location) =>
                    location.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            )
        }
    }, [initialData, debouncedSearchTerm])

    return (
        <AdminContainer>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search for location"
            />
            <SearchResultContainer>
                {filteredData?.map((location, i) => (
                    <div id={i === filteredData.length - 1 ? 'lastItem' : ''}>
                        <AdminSearchCard searchType={SearchType.Location} data={location} />
                    </div>
                ))}
            </SearchResultContainer>
            <ButtonContainer>
                <Button
                    onClick={() => navigate('/admin/add-location')}
                    children={'Add new location'}
                    backgroundColor={'black'}
                    color={'white'}
                />
            </ButtonContainer>
        </AdminContainer>
    )
}

export default Locations
