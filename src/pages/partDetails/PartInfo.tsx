import { styled } from 'styled-components'
import { Item } from '../../services/apiTypes'



export const PartInfo = ({item}: {item: Item}) => {
    
    return (
        <Container>
            <div>
                <div>
                    <p><strong>Description</strong></p>
                    <p>{item.description}</p>
                </div>
                <div>
                    <p><strong>Product number</strong></p>
                    <p>{item.productNumber?.toUpperCase()}</p>
                </div>
                <div>
                <p><strong>Serial number</strong></p>
                    <p>{item.serialNumber?.toUpperCase()}</p>
                </div>
                <div>
                <p><strong>Serial number</strong></p>
                    <p>{item.vendor}</p>
                </div>
            </div>
            <div>
                <div>
                    <p><strong>Added by</strong></p>
                    <p>{item.addedByFirstName} {item.addedByLastName}</p>
                </div>
                <div>
                    <p><strong>Updated date</strong></p>
                    <p>{item.updatedDate}</p>
                </div>
                <div>
                    <p><strong>Type</strong></p>
                    <p>{item.type}</p>
                </div>
            </div>
            <div>
                <div>
                    <p><strong>Location</strong></p>
                    <p>{item.location}</p>
                </div>
            </div>
        </Container>

    )
}


const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`