import { useState } from 'react'
import { AiFillFileImage } from 'react-icons/ai'
import { MdCloudUpload } from 'react-icons/md'
import { Box, Wrapper } from './styles'

export const ExampleUpload = () => {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('No selected file')
    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(URL.createObjectURL(event.target.files[0]))
        }
    }
    return (
        <Wrapper>
            <form>
                <Box>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="file"
                            onChange={loadFile}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {file ? (
                        <img
                            src={file}
                            width={150}
                            height={150}
                            alt={fileName}
                        />
                    ) : (
                        <>
                            <MdCloudUpload color="#1475cf" size={60} />
                            <p>Example file uploader</p>
                        </>
                    )}
                </Box>{' '}
            </form>
            <div>
                <AiFillFileImage color="#1475cf" />
                <span className="upload-content">{fileName} -</span>
            </div>
        </Wrapper>
    )
}
