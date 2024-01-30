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

type FileProps = {
    doc?: Document;
    file?: File;
    handleFileDelete?: (documentId: string) => void;
    handleFileRemoval?: () => void;
};

const File = ({ doc, file, handleFileDelete, handleFileRemoval }: FileProps) => {
    const handleFileDownload = (doc?: Document, file?: File) => {
        if (file) {
            const downloadLink = document.createElement('a');
            downloadLink.download = `${file.name}`;
            downloadLink.href = `data:${file.type};base64,${file.text}`;
            downloadLink.click();
        }
        if (doc) {
            const downloadLink = document.createElement('a');
            downloadLink.download = `${doc.name}`;
            downloadLink.href = `data:${doc.contentType};base64,${doc.bytes}`;
            downloadLink.click();
        }
    };

    return (
        <StyledFileWrapper key={doc ? doc.id : file?.name} className="files">
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
                            <h3>.{document.contentType.split('/')[1].toUpperCase()}</h3>
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
                            <MuiButton
                                onClick={
                                    doc && handleFileDelete
                                        ? () => handleFileDelete(doc.id)
                                        : handleFileRemoval
                                }
                                sx={{ color: 'black' }}
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
            <StyledDocumentName>{doc ? doc.name.split('.')[0] : file?.name}</StyledDocumentName>
        </StyledFileWrapper>
    );
};

export default File;
