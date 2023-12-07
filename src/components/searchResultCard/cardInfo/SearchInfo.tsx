
import { Item } from '../../../services/apiTypes'
import {
    DescriptionParagraph,
    FirstInfoBox,
    InfoP,
    KeyWords,
    SecondInfoBox,
    ThirdInfoBox,
} from '../styles'
import { format, parse } from 'date-fns'


type Props = {
    part: Item
}

export const Searchinfo = ({ part }: Props) => {
    return (
        <>
            {' '}
            <FirstInfoBox>
                <InfoP>
                    <KeyWords>WP ID</KeyWords>
                    {part.wpId}
                </InfoP>
                <InfoP>
                    <KeyWords> S/N</KeyWords>
                    {part.serialNumber}
                </InfoP>
                <InfoP>
                    <KeyWords> P/N</KeyWords>
                    {part.productNumber}
                </InfoP>
            </FirstInfoBox>
            <SecondInfoBox>
                <DescriptionParagraph>{part.description}</DescriptionParagraph>
            </SecondInfoBox>
            <ThirdInfoBox>
                <InfoP>
                    <KeyWords>Location</KeyWords> {part.location}
                </InfoP>
                <InfoP>
                    {' '}
                    <KeyWords>Vendor</KeyWords>
                    {part.vendor}
                </InfoP>
                <InfoP>
                    {' '}
                    <KeyWords>Created date</KeyWords> {format((new Date(part.createdDate)), "yyyy-MM-dd HH:mm:ss").toString()}{' '}
                </InfoP>
            </ThirdInfoBox>
        </>
    )
}
