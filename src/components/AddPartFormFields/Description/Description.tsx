import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { StyledTextArea } from '../Comment/styles';

import { StyledDiv, StyledErrorP } from '../styles';
import { StyledInputWrap } from './styles';

export const Description = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <StyledDiv>
            <StyledInputWrap>
                <label htmlFor="description">Description </label>{' '}
                <ErrorMessage
                    name="description"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <StyledTextArea
                placeholder="E.g. Hydraulic cylinders can be purchased in a range of ISO standard measurement bore"
                rows={4}
                cols={40}
                maxLength={450}
                {...register('description')}
            />
        </StyledDiv>
    );
};
