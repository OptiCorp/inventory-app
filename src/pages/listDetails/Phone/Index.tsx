import { useState } from 'react'

const Index = () => {
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return <></>
}

export default Index
