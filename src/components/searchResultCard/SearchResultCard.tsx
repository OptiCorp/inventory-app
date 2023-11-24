import { useWindowDimensions } from "../../hooks"
import { Item } from "../../services/apiTypes"
import { ResultCardContainer, DescriptionParagraph } from "./styles"


type Props = {
    part: Item
}

const SearchResultCard = ({ part }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <ResultCardContainer>
            <div style={{ lineHeight: '25px', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)' }}>
                <p style={{ margin: '8px 0px' }}><b>WP ID</b> {part.wpId}<br />
                    <b>S/N</b> {part.serialNumber}<br />
                    <b>P/N</b> {part.productNumber}</p>
            </div>
            <div style={{ padding: '8px', borderRight: '1px solid rgba(208, 208, 208)', lineHeight: '25px', minWidth: '400px' }}>
                <DescriptionParagraph>{part.description}</DescriptionParagraph>
            </div>
            <div style={{ padding: '8px', lineHeight: '25px' }}>
                <p style={{ margin: '8px 0px' }}><b>Location</b> {part.location}<br />
                    <b>Vendor</b> {part.vendor}<br />
                    <b>Last updated</b> {part.updatedDate}</p>
            </div>
        </ResultCardContainer>
    )
}

export default SearchResultCard
