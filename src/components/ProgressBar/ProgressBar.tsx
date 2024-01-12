import { useLocation } from 'react-router-dom'
import { useWindowDimensions } from '../../hooks'
import { Container, ProgressCircle, ProgressLine, ProgressLink } from './styles'

type Props = {
    progressLevel: number
}

const ProgressBar = ({ progressLevel }: Props) => {
    const { width } = useWindowDimensions()
    const location = useLocation()

    const paths = location.pathname.split('/').filter((name) => name !== '')

    return (
        <Container>
            <ProgressLink to={progressLevel >= 1 ? '/add-part/batch' : ''}>
                <ProgressCircle
                    finished={progressLevel > 1}
                    active={progressLevel === 1}
                    width={width}
                >
                    1
                </ProgressCircle>
            </ProgressLink>
            <ProgressLine active={progressLevel >= 2} width={width} />
            <ProgressLink to={progressLevel >= 2 ? '/add-part/checks' : ''}>
                <ProgressCircle
                    finished={progressLevel > 2}
                    active={progressLevel == 2}
                    width={width}
                >
                    2
                </ProgressCircle>
            </ProgressLink>
            <ProgressLine active={progressLevel >= 3} width={width} />
            <ProgressLink to={progressLevel >= 3 ? '/add-part/upload' : ''}>
                <ProgressCircle
                    finished={progressLevel > 3}
                    active={progressLevel == 3}
                    width={width}
                >
                    3
                </ProgressCircle>
            </ProgressLink>
            <ProgressLine active={progressLevel >= 4} width={width} />
            <ProgressCircle finished={progressLevel > 4} active={progressLevel === 4} width={width}>
                4
            </ProgressCircle>
        </Container>
    )
}

export default ProgressBar
