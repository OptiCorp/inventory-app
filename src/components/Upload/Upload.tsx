import { ChangeEvent, useState } from 'react'
import { AiOutlineFileJpg, AiOutlineFilePdf, AiOutlineFileImage } from 'react-icons/ai'
import { Container, FileContainer, StyledLabel, Wrapper } from './styles'
import { useUploadDocument } from '../../services/hooks/Documents/useUploadDocument'
import { AddDocument, Document, Item } from '../../services/apiTypes'
import { useGetDocumentsByItemId } from '../../services/hooks/Documents/useGetDocumentsByItemId'
import { Box, Modal } from '@mui/material'

type UploadProps = {
    item: Item
}

export const ExampleUpload = ({ item }: UploadProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentImageOpen, setCurrentImageOpen] = useState<Document>()
    const { data } = useGetDocumentsByItemId(item.id)
    const { mutate } = useUploadDocument()

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const document: AddDocument = {
                itemId: item.id,
                files: [...e.target.files],
            }
            mutate(document)
        }
    }

    const handleOpen = (document: Document) => {
        setCurrentImageOpen(document)
        setModalIsOpen(true)
    }

    const handleClose = () => {
        setModalIsOpen(false)
        setCurrentImageOpen(undefined)
    }

    return (
        <>
            {/* <Modal open={modalIsOpen} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
                    <img
                        src={`data:${currentImageOpen?.contentType};base64, ${currentImageOpen?.bytes}`}
                        width={200}
                    />
                </Box>
            </Modal> */}
            <Wrapper>
                {data?.map((document) => (
                    <FileContainer onClick={() => handleOpen(document)}>
                        {document.contentType === 'image/png' ? (
                            <AiOutlineFileImage size={60} />
                        ) : document.contentType === 'image/pdf' ? (
                            <AiOutlineFilePdf size={60} />
                        ) : (
                            <AiOutlineFileJpg size={60} />
                        )}
                        <span>example</span>
                    </FileContainer>
                ))}
            </Wrapper>
            <Container>
                <StyledLabel>
                    {' '}
                    <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
                    UPLOAD NEW
                </StyledLabel>
            </Container>
        </>
    )
}
