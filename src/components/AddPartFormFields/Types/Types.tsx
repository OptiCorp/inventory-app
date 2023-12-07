import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'
import { ToolTip } from '../../ToolTip'
import { ErrorP, IconContainer, InputWrap, StyledSelect } from './styles'

export const Types = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <InputWrap>
            <IconContainer>
                <label htmlFor="type">Choose a type</label>{' '}
                <ToolTip content="Specify Unit,   or Item (lowest tier)">
                    <FaRegQuestionCircleIcon />
                </ToolTip>
            </IconContainer>
            <StyledSelect
                style={{ maxWidth: '500px' }}
                id="type"
                placeholder="sfsdf"
                defaultValue="Specify Unit, or Item (lowest tier)"
                {...register('type')}
            >
                <option value="unit">unit</option>
                <option value="assembly">assembly</option>
                <option value="sub-assembly"> sub-assembly</option>
                <option value="part">part</option>
            </StyledSelect>
            <ErrorMessage
                name="type"
                render={({ message }) => <ErrorP>{message}</ErrorP>}
            />
        </InputWrap>
    )
}
