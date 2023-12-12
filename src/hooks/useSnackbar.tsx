import { Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

const useSnackBar = () => {
    const [showSnackbar, setShowSnackBar] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    const snackbar = (
        <Snackbar
            autoHideDuration={3000}
            onClose={() => {
                setShowSnackBar(false)
                setSnackbarText('')
            }}
            open={showSnackbar}
            message={snackbarText}
        />
    )
    useEffect(() => {
        if (snackbarText.length < 1) return
        setShowSnackBar(true)
    }, [snackbarText])

    return {
        setSnackbarText,
        snackbar,
    }
}

export default useSnackBar
