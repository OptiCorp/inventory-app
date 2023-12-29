import { AiOutlineFileImage, AiOutlineFileJpg, AiOutlineFilePdf } from 'react-icons/ai'
import { Container, FileContainer, StyledLabel, Wrapper } from './styles'
import { useFormContext } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'

const AddPartUpload = () => {
    const { register } = useFormContext()
    const [files, setFiles] = useState<File[]>()
    const documentationField = register('files')
    return (
        <>
            <Wrapper>
                {files?.map((file) => (
                    <FileContainer>
                        {file.type === 'image/png' ? (
                            <AiOutlineFileImage size={60} />
                        ) : file.type === 'image/pdf' ? (
                            <AiOutlineFilePdf size={60} />
                        ) : (
                            <AiOutlineFileJpg size={60} />
                        )}
                        <span>{file.name}</span>
                    </FileContainer>
                ))}
            </Wrapper>
            <Container>
                <StyledLabel>
                    {' '}
                    <input
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        {...documentationField}
                        onChange={(e) => {
                            documentationField.onChange(e)
                            setFiles([...e.target.files!])
                        }}
                    />
                    UPLOAD NEW
                </StyledLabel>
            </Container>
        </>
    )
}

export default AddPartUpload
