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
                <label htmlFor="type">Choose an item type</label>{' '}
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
                <option value="unit">Unit</option>
                <option value="assembly">Assembly</option>
                <option value="sub-assembly"> Subassembly</option>
                <option value="part">Part</option>
            </StyledSelect>
            <ErrorMessage name="type" render={({ message }) => <ErrorP>{message}</ErrorP>} />
        </InputWrap>
    )
}
