import { useWindowDimensions } from "../../hooks"
import { Part, Assembly } from "../../services/apiTypes"
import { ResultCardContainer, StyledParagraph } from "./styles"

type Props = {
    part: Assembly
}

const SearchResultCard = ({ part }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <ResultCardContainer>
            <div style={{ lineHeight: '25px', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)' }}>
                <p style={{ margin: '8px 0px' }}><b>WP ID</b> {part.WPId}<br />
                    <b>S/N</b> {part.SerialNumber}<br />
                    <b>P/N</b> {part.SerialNumber}</p>
            </div>
            <div style={{ flex: '2', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)', lineHeight: '25px', minWidth: '400px' }}>
                <StyledParagraph>{part.Description}</StyledParagraph>
            </div>
            <div style={{ padding: '8px', lineHeight: '25px' }}>
                <p style={{ margin: '8px 0px' }}><b>Location</b> {part.Location}<br />
                    <b>Vendor</b> {part.Vendor}<br />
                    <b>Last updated</b> {part.UpdatedDate}</p>
            </div>
        </ResultCardContainer>
    )
}

export default SearchResultCard
