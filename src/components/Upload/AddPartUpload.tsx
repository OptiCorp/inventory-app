import { AiOutlineFileImage, AiOutlineFileJpg, AiOutlineFilePdf } from 'react-icons/ai'
import {
    Container,
    DocumentName,
    FileContainer,
    FileShapeWrapper,
    FileTypeWrapper,
    FileWrapper,
    IconWrapper,
    StyledLabel,
    Wrapper,
} from './styles'
import { useFormContext } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const AddPartUpload = () => {
    const { register } = useFormContext()
    const [files, setFiles] = useState<File[]>()
    const documentationField = register('files')
    return (
        <>
            <Wrapper>
                {files?.map((file) => (
                    <FileWrapper>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="121"
                            height="153"
                            viewBox="0 0 121 153"
                            fill="none"
                        >
                            <foreignObject width={121} height={153}>
                                <FileShapeWrapper>
                                    <FileTypeWrapper>
                                        <h3>.{file.type.split('/')[1].toUpperCase()}</h3>
                                    </FileTypeWrapper>
                                    <IconWrapper>
                                        <FileDownloadOutlinedIcon fontSize="large" />
                                        <DeleteOutlineOutlinedIcon fontSize="large" />
                                    </IconWrapper>
                                </FileShapeWrapper>
                            </foreignObject>
                            <path
                                d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                                stroke="black"
                            />
                        </svg>
                        <DocumentName>{file.name.split('.')[0]}</DocumentName>
                    </FileWrapper>
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
