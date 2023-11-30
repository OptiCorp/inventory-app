import { ListItem, StyledList, ThirdList, Wrapper } from './styles'

export const Comments = () => {
    return (
        <>
            <Wrapper>
                <StyledList>
                    <input></input>
                </StyledList>
            </Wrapper>
            <ThirdList>
                list of comments
                <ListItem>
                    <input disabled={true} />
                </ListItem>
                <ListItem>
                    {' '}
                    <input disabled={true} />
                </ListItem>
                <ListItem>
                    {' '}
                    <input disabled={true} />
                </ListItem>
                <ListItem>
                    {' '}
                    <input disabled={true} />
                </ListItem>
            </ThirdList>
        </>
    )
}
