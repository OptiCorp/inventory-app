import { useFormContext } from 'react-hook-form';
import { StyledDiv } from '../styles';
import { StyledInputWrap, StyledTextArea } from './styles';

export const Comment = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <StyledDiv>
            <StyledInputWrap>
                <label htmlFor="Comment">Comment</label>{' '}
            </StyledInputWrap>
            <StyledTextArea {...register('comment')} rows={5} cols={40} maxLength={450} />
        </StyledDiv>
    );
};
