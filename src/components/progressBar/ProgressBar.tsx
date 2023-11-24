import { Container } from "./styles"

const ProgressBar = () => {
    return (
        <Container>
            <div style={{ borderRadius: '20px', backgroundColor: 'black', width: '20px', padding: '8px', color: 'white', display: 'flex', justifyContent: 'center' }}>1</div>
            <div style={{ width: '60px', backgroundColor: 'black', height: '3px', alignSelf: 'center', marginLeft: '4px' }}></div>
        </Container>
    )
}

export default ProgressBar
