import { useNavigate } from 'react-router-dom'

import { Item } from '../../services/apiTypes'
import {
    CardInfoWrap,
    DescriptionParagraph,
    FirstInfoBox,
    InfoP,
    KeyWords,
    SecondInfoBox,
    ThirdInfoBox,
} from './styles'
import { useLocalStorage } from 'usehooks-ts'

type Props = {
    part: Item
    searchTerm: string
}

export const Searchinfo = ({ part, searchTerm }: Props) => {
    const navigate = useNavigate()
    const [_, setRememberSearch] = useLocalStorage<string[]>(
        'recent_searches',
        []
    )

    const HandleClick = () => {
        setRememberSearch((prev) => [...prev.slice(-4), searchTerm])
        navigate(`/${part.wpId}`)
    }
    return (
        <CardInfoWrap onClick={HandleClick}>
            {' '}
            <FirstInfoBox>
                <InfoP>
                    <KeyWords>WP ID</KeyWords>
                    {part.wpId}
                </InfoP>
                <InfoP>
                    {' '}
                    <KeyWords> S/N</KeyWords>
                    {part.serialNumber}
                </InfoP>
                <InfoP>
                    {' '}
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
                    <KeyWords>Last updated</KeyWords> {part.updatedDate}{' '}
                </InfoP>
            </ThirdInfoBox>
        </CardInfoWrap>
    )
}
