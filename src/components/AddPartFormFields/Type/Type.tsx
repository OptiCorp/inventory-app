import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';

import { FormOption } from '../../../services/apiTypes.ts';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { FormSelect } from '../FormSelect/FormSelect.tsx';
import { StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const Type = () => {
    const { setValue } = useFormContext();

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(null);

    const options = [
        { value: 'unit', label: 'Unit' },
        { value: 'assembly', label: 'Assembly' },
        { value: 'subassembly', label: 'Subassembly' },
        { value: 'part', label: 'Part' },
    ];

    useEffect(() => {
        setValue('type', selectedOption?.value ?? '');
    }, [selectedOption, setValue]);

    return (
        <>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="type">Choose an item type</label>{' '}
                    <ToolTip content="Specify Unit, or Item (lowest tier)">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="type"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <FormSelect
                options={options}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </>
    );
};
