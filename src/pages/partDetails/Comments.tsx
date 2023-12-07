import { TextField } from '@mui/material'
import { useState } from 'react'
import { Button } from '../../components/Button/SubmitButton'
import { Item } from '../../services/apiTypes'

export const Comments = ({ item }: { item: Item }) => {
    const [content, setContent] = useState(item?.comment)
    return (
        <>
            <div>
                <div>
                    {' '}
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows={5}
                        defaultValue={item.comment || content}
                        fullWidth
                        onChange={(event) => {
                            setContent(event.target.value)
                        }}
                        key={item?.wpId ?? ''}
                        variant="filled"
                        sx={{
                            '&::before': {
                                display: 'none',
                            },
                            '&:focus-within': {
                                outline:
                                    '2px solid var(--Textarea-focusedHighlight)',
                                outlineOffset: '2px',
                            },
                        }}
                    />
                </div>
                <div>
                    <Button>Sumbit</Button>
                </div>
            </div>
        </>
    )
}
