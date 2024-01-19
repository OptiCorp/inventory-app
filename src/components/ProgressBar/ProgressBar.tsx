import { useWindowDimensions } from '../../hooks';
import { Container, StyledProgressCircle, StyledProgressLine, StyledProgressLink } from './styles';

type Props = {
    progressLevel: number;
};

const ProgressBar = ({ progressLevel }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <Container>
            <StyledProgressLink to={progressLevel >= 1 ? '/add-part/batch' : ''}>
                <StyledProgressCircle
                    finished={progressLevel > 1}
                    active={progressLevel === 1}
                    width={width}
                >
                    1
                </StyledProgressCircle>
            </StyledProgressLink>
            <StyledProgressLine active={progressLevel >= 2} width={width} />
            <StyledProgressLink to={progressLevel >= 2 ? '/add-part/checks' : ''}>
                <StyledProgressCircle
                    finished={progressLevel > 2}
                    active={progressLevel == 2}
                    width={width}
                >
                    2
                </StyledProgressCircle>
            </StyledProgressLink>
            <StyledProgressLine active={progressLevel >= 3} width={width} />
            <StyledProgressLink to={progressLevel >= 3 ? '/add-part/upload' : ''}>
                <StyledProgressCircle
                    finished={progressLevel > 3}
                    active={progressLevel == 3}
                    width={width}
                >
                    3
                </StyledProgressCircle>
            </StyledProgressLink>
            <StyledProgressLine active={progressLevel >= 4} width={width} />
            <StyledProgressCircle
                finished={progressLevel > 4}
                active={progressLevel === 4}
                width={width}
            >
                4
            </StyledProgressCircle>
        </Container>
    );
};

export default ProgressBar;
