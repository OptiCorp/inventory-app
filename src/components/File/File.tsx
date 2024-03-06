import {
    StyledDocumentName,
    StyledFileShapeWrapper,
    StyledFileTypeWrapper,
    StyledFileWrapper,
    StyledIconWrapper,
} from './style';
import { Button as MuiButton, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Document } from '../../services/apiTypes';

type FileProps = {
    doc?: Document;
    file?: File;
    handleFileRemoval: () => void;
    downloadButton?: boolean;
};

export const File = ({ doc, file, handleFileRemoval, downloadButton }: FileProps) => {
    const handleFileDownload = (doc?: Document, file?: File) => {
        if (file) {
            if (confirm('Download?')) {
                const downloadLink = document.createElement('a');
                downloadLink.download = `${file.name}`;
                downloadLink.href = `data:${file.type};base64,${URL.createObjectURL(file)}`;
                downloadLink.click();
            }
        }
        if (doc) {
            if (confirm(`Download ${fileName}?`)) {
                const downloadLink = document.createElement('a');
                downloadLink.download = `${doc.name}`;
                downloadLink.href = `data:${doc.contentType};base64,${doc.bytes}`;
                downloadLink.click();
            }
        }
    };

    const maxLength = 14;
    const fileName = doc?.fileName ? doc.fileName : doc?.name;

    return (
        <Tooltip title={fileName}>
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
                                {downloadButton && (
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
                                )}
                                <MuiButton
                                    onClick={handleFileRemoval}
                                    sx={{ color: 'black', marginLeft: 'auto' }}
                                >
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
                    {doc?.fileName
                        ? doc.fileName.length > maxLength
                            ? `${doc.fileName.substring(0, maxLength)}...`
                            : doc.fileName
                        : doc?.name}
                </StyledDocumentName>
            </StyledFileWrapper>
        </Tooltip>
    );
};
