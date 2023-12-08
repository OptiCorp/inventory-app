import { useState } from 'react'
import { AiOutlineFileJpg } from 'react-icons/ai'
import { Container, StyledLabel, Wrapper } from './styles'

export const ExampleUpload = () => {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('No selected file')
    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0)
        if (file) {
            setFile(URL.createObjectURL(file))
        }
    }
    return (
        <>
            <Wrapper>
                <AiOutlineFileJpg size={60} />
                <p>example</p>
            </Wrapper>
            <Container>
                <StyledLabel>
                    {' '}
                    <input type="file" style={{ display: 'none' }} />
                    upload new
                </StyledLabel>
            </Container>
        </>
    )
}
