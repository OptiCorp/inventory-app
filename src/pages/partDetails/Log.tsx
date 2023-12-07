import { TextField } from '@mui/material'

export const Log = () => {
    return (
        <>
            {' '}
            <div>
                {' '}
                <TextField
                    id="filled-multiline-static"
                    multiline
                    rows={5}
                    defaultValue={
                        '08.01.2023: Location changed from Deepwater Explorer 12 to Wellpartner Workshop Tananger'
                    }
                    fullWidth
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
        </>
    )
}
