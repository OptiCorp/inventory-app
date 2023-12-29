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

    return (
        <>
            <Wrapper>
                {data?.map((document) => (
                    <FileContainer>
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
                    <input
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    UPLOAD NEW
                </StyledLabel>
            </Container>
        </>
    )
}
