import { useWindowDimensions } from "../../hooks"
import { Part, Assembly, Subassembly, Item, Unit } from "../../services/apiTypes"
import { ResultCardContainer, StyledParagraph } from "./styles"

type Props = {
    part: Assembly | Subassembly | Item | Unit
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
            <div style={{ flex: '2', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)', lineHeight: '25px', minWidth: '400px' }}>
                <StyledParagraph>{part.description}</StyledParagraph>
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
