import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, IconContainer, InputWrap, StyledInput } from './styles'
import { ToolTip } from '../../ToolTip'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'

export const ProductNumber = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div style={{ marginTop: '24px' }}>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="productNumber">Product number</label>{' '}
                    <ToolTip content="Specify a product number">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage
                    name="productNumber"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <StyledInput type="text" placeholder="E.g BV 113 EU" {...register('productNumber')} />
        </div>
    )
}
