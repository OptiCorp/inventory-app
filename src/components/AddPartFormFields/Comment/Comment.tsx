import { useFormContext } from 'react-hook-form';
import { InputWrap, StyledDiv, StyledTextArea } from './styles';

export const Comment = () => {
    const { register } = useFormContext();
    return (
        <StyledDiv>
            <InputWrap>
                <label htmlFor="Comment">Comment</label>{' '}
            </InputWrap>
            <StyledTextArea {...register('comment')} rows={5} cols={40} maxLength={450} />
        </StyledDiv>
    );
};
