import {
    StyledDocumentName,
    StyledFileShapeWrapper,
    StyledFileTypeWrapper,
    StyledFileWrapper,
    StyledIconWrapper,
} from './style';
import { Button as MuiButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Document } from '../../services/apiTypes';
import { useState } from 'react';

type FileProps = {
    doc?: Document;
    file?: File;
    handleFileRemoval: () => void;
};

export const File = ({ doc, file, handleFileRemoval }: FileProps) => {
    const handleFileDownload = (doc?: Document, file?: File) => {
        if (file) {
            const downloadLink = document.createElement('a');
            downloadLink.download = `${file.name}`;
            downloadLink.href = `data:${file.type};base64,${URL.createObjectURL(file)}`;
            downloadLink.click();
        }
        if (doc) {
            const downloadLink = document.createElement('a');
            downloadLink.download = `${doc.name}`;
            downloadLink.href = `data:${doc.contentType};base64,${doc.bytes}`;
            downloadLink.click();
        }
    };
    const [show, setShow] = useState(false);

    return (
        <StyledFileWrapper className="files">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="121"
                height="153"
                viewBox="0 0 121 153"
                fill="none"
            >
                <foreignObject width={121} height={153}>
                    <StyledFileShapeWrapper>
                        <StyledFileTypeWrapper>
                            <h3>
                                .
                                {doc
                                    ? doc.contentType.split('/')[1].toUpperCase()
                                    : file?.type.split('/')[1].toUpperCase()}
                            </h3>
                        </StyledFileTypeWrapper>
                        <StyledIconWrapper>
                            <MuiButton
                                onClick={
                                    doc
                                        ? () => handleFileDownload(doc)
                                        : () => handleFileDownload(undefined, file)
                                }
                                sx={{ color: 'black' }}
                            >
                                <FileDownloadOutlinedIcon fontSize="large" />
                            </MuiButton>
                            <MuiButton onClick={handleFileRemoval} sx={{ color: 'black' }}>
                                <DeleteOutlineOutlinedIcon fontSize="large" />
                            </MuiButton>
                        </StyledIconWrapper>
                    </StyledFileShapeWrapper>
                </foreignObject>
                <path
                    d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                    stroke="black"
                />
            </svg>
            <StyledDocumentName>
                {show && <span>{doc?.fileName}</span>}

                <p
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                    style={{
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {doc?.fileName ? doc?.fileName : 'No file name'}
                </p>
            </StyledDocumentName>
        </StyledFileWrapper>
    );
};
