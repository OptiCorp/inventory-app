import { useWindowDimensions } from "../../hooks"
import { Part } from "../../types/types"
import { ResultCardContainer, StyledParagraph } from "./styles"

type Props = {
    part: Part
}

const SearchResultCard = ({ part }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <ResultCardContainer>
            <div style={{ lineHeight: '25px', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)' }}>
                <p style={{ margin: '8px 0px' }}><b>WP ID</b> {part.WPID}<br />
                    <b>S/N</b> {part.SN}<br />
                    <b>P/N</b> {part.PN}</p>
            </div>
            <div style={{ flex: '2', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)', lineHeight: '25px', minWidth: '400px' }}>
                <StyledParagraph>{part.Description}</StyledParagraph>
            </div>
            <div style={{ padding: '8px', lineHeight: '25px' }}>
                <p style={{ margin: '8px 0px' }}><b>Location</b> {part.Location}<br />
                    <b>Vendor</b> {part.Vendor}<br />
                    <b>Last updated</b> {part.LastUpdated}</p>
            </div>
        </ResultCardContainer>
    )
}

export default SearchResultCard
