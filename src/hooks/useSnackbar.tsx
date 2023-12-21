import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material'
import { useEffect, useState } from 'react'

export const useSnackBar = () => {
    const [showSnackbar, setShowSnackBar] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success')
    const [snackbarPosition, setSnackbarPosition] = useState<SnackbarOrigin>({
        vertical: 'bottom',
        horizontal: 'left',
    })

    const { horizontal, vertical } = snackbarPosition

    const snackbar = (
        <Snackbar
            autoHideDuration={3000}
            onClose={() => {
                setShowSnackBar(false)
                setSnackbarText('')
                setSnackbarSeverity('success')
            }}
            open={showSnackbar}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert severity={snackbarSeverity}>{snackbarText}</Alert>
        </Snackbar>
    )
    useEffect(() => {
        if (snackbarText.length < 1) return
        setShowSnackBar(true)
    }, [snackbarText])

    return {
        setSnackbarText,
        snackbar,
        setSnackbarSeverity,
        setSnackbarPosition,
    }
}
