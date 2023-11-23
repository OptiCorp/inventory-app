import { useWindowDimensions } from "../../hooks";
import { Item } from "../../services/apiTypes";
import { ResultCardCompactContainer } from "./styles";

type Props = {
    part: Item;
}

const SearchResultCardCompact = ({ part }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <ResultCardCompactContainer>
            <div style={{ display: 'flex', justifyContent: 'start', flexBasis: '100%' }}>
                <div style={{ paddingRight: '150px', paddingLeft: '20px' }}>
                    <p><b>ID:</b></p>
                    <p>{part.wpId}</p>
                </div>
                <div>
                    <p><b>Location</b></p>
                    <p>{part.location}</p>

                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 20px' }}>{part.description}</div>
        </ResultCardCompactContainer>
    )
}

export default SearchResultCardCompact


{/* <div style={{ lineHeight: '25px', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)' }}>
    <p style={{ margin: '8px 0px' }}><b>WP ID</b> {part.WPID}<br />
        <b>S/N</b> {part.SN}<br />
        <b>P/N</b> {part.PN}</p>
</div>
<div style={{ flex: '2', padding: '8px', borderRight: '1px solid rgba(208, 208, 208)', lineHeight: '25px', minWidth: '600px' }}>
    <StyledParagraph>{part.Description}</StyledParagraph>
</div>
<div style={{ padding: '8px', lineHeight: '25px' }}>
    <p style={{ margin: '8px 0px' }}><b>Location</b> {part.Location}<br />
        <b>Vendor</b> {part.Vendor}<br />
        <b>Last updated</b> {part.LastUpdated}</p>
</div> */}
