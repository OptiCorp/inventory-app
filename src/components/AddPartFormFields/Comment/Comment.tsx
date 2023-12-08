import { useFormContext } from 'react-hook-form'
import { InputWrap, StyledTextArea } from './styles'

export const Comment = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div>
            <InputWrap>
                <label htmlFor="Comment">Comment</label>{' '}
            </InputWrap>
            <StyledTextArea
                placeholder="Comment"
                {...register('comment')}
                rows={5}
                cols={40}
                maxLength={450}
            />
        </div>
    )
}
