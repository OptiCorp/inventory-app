import { Item } from '../../services/apiTypes'
import { format } from 'date-fns'

export const Log = ({ item }: { item: Item }) => {
    const sortedLogEntries = item.logEntries.sort((a, b) => {
        const sortedA = new Date(a.createdDate).valueOf()
        const sortedB = new Date(b.createdDate).valueOf()
        return sortedB - sortedA
    })
    return (
        <>
            <div
                style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: '#f0f0f0',
                    padding: '16px',
                }}
            >
                {sortedLogEntries.map((entry) => {
                    const fullName = `${entry.user.firstName} ${entry.user.lastName}`
                    return (
                        <p key={`key-${entry.createdDate}-${entry.createdDate}`}>
                            {`${format(new Date(entry.createdDate), 'dd.MM.yyyy').toString()}: ${
                                entry.message
                            } by user ${fullName} `}
                        </p>
                    )
                })}
            </div>
            {/* <TextField
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
                        outline: '2px solid var(--Textarea-focusedHighlight)',
                        outlineOffset: '2px',
                    },
                }}
            /> */}
        </>
    )
}
