import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { StyledTextArea } from '../Comment/styles'
import { ErrorP, InputWrap, StyledDiv } from './styles'
import React from 'react'

export const Description = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <StyledDiv>
            <InputWrap>
                <label htmlFor="description">Description </label>{' '}
                <ErrorMessage
                    name="description"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <StyledTextArea
                placeholder="E.g. Hydraulic cylinders can be purchased in a range of ISO standard measurement bore"
                rows={4}
                cols={40}
                maxLength={450}
                {...register('description')}
            />
        </StyledDiv>
    )
}
