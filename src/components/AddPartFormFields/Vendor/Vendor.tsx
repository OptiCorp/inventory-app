import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'
import { ToolTip } from '../../ToolTip'
import { IconContainer } from '../SerialNumber/styles'
import { ErrorP, InputWrap, StyledInput } from './styles'

export const Vendor = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                {' '}
                <IconContainer>
                    <label htmlFor="vendor">Name of vendor </label>{' '}
                    <ToolTip content="Please specify full company name of vendor">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage name="vendor" render={({ message }) => <ErrorP>{message}</ErrorP>} />
            </InputWrap>
            <StyledInput type="text" placeholder="E.g. ABB" {...register('vendor')} />
        </>
    )
}
