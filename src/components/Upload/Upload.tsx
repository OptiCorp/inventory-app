import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { AddDocument, Document, Item } from '../../services/apiTypes';
import { useDeleteDocument } from '../../services/hooks/documents/useDeleteDocument';
import { useGetDocumentsByItemId } from '../../services/hooks/documents/useGetDocumentsByItemId';
import { useUploadDocument } from '../../services/hooks/documents/useUploadDocument';
import { Button as SubmitButton } from '../Button/Button';
import {
    Container,
    DocumentName,
    FileShapeWrapper,
    FileTypeWrapper,
    FileWrapper,
    IconWrapper,
    Wrapper,
} from './styles';

type UploadProps = {
    item: Item;
};

export const ExampleUpload = ({ item }: UploadProps) => {
    const { data } = useGetDocumentsByItemId(item.id);
    const { mutate: uploadDocument } = useUploadDocument();
    const { mutate: deleteDocument } = useDeleteDocument(item.id);
    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const document: AddDocument = {
                itemId: item.id,
                files: [...e.target.files],
            };
            uploadDocument(document);
        }
    };

    const handleFileDownload = (file: Document) => {
        const downloadLink = document.createElement('a');
        downloadLink.download = `${file.name}`;
        downloadLink.href = `data:${file.contentType};base64,${file.bytes}`;
        downloadLink.click();
    };

    const handleFileDelete = (documentId: string) => {
        deleteDocument(documentId);
    };

    return (
        <>
            <Wrapper>
                {data?.map((document) => (
                    <FileWrapper key={document.id}>
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
                                        <h3>.{document.contentType.split('/')[1].toUpperCase()}</h3>
                                    </FileTypeWrapper>
                                    <IconWrapper>
                                        <Button
                                            onClick={() => handleFileDownload(document)}
                                            sx={{ color: 'black' }}
                                        >
                                            <FileDownloadOutlinedIcon fontSize="large" />
                                        </Button>
                                        <Button
                                            onClick={() => handleFileDelete(document.id)}
                                            sx={{ color: 'black' }}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize="large" />
                                        </Button>
                                    </IconWrapper>
                                </FileShapeWrapper>
                            </foreignObject>
                            <path
                                d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                                stroke="black"
                            />
                        </svg>
                        <DocumentName>{document.name.split('.')[0]}</DocumentName>
                    </FileWrapper>
                ))}
            </Wrapper>
            <Container>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    {' '}
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        ref={inputFile}
                    />
                    UPLOAD NEW
                </SubmitButton>
            </Container>
        </>
    );
};
