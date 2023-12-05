import { TextField } from '@mui/material'
import { useState } from 'react'
import { Item } from '../../services/apiTypes'

export const Comments = ({ item }: { item: Item }) => {
    const [content, setContent] = useState(item?.comment)
    return (
        <>
            <div></div>
            <div>
                {' '}
                <TextField
                    id="filled-multiline-static"
                    multiline
                    rows={5}
                    value={content}
                    fullWidth
                    onChange={(event) => {
                        setContent(event.target.value)
                    }}
                    key={item?.wpId ?? ''}
                    variant="filled"
                />
            </div>
        </>
    )
}
