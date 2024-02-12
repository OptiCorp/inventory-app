import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { useDebounce } from 'usehooks-ts';
import { useIsWpIdUnique } from '../../../services/hooks/items/useIsWpIdUnique';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';
import { StyledParagraph } from './styles';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import React from 'react';

type WpIdProps = {
    index?: number;
    wpId: string;
    fieldName: string;
    isPlainText?: boolean;
    onChange: (value: string) => void;
};

export const WpId = ({ fieldName, wpId, onChange, isPlainText }: WpIdProps) => {
    const { register, setValue } = useFormContext<ItemSchema>();
    const [inputValue, setInputValue] = useState(wpId);
    const debouncedWpId = useDebounce(wpId, 500);
    const { data: isUnique, isLoading } = useIsWpIdUnique(debouncedWpId);

    useEffect(() => {
        setValue(fieldName as keyof ItemSchema, inputValue);
        setValue('uniqueWpId', isUnique!);
        onChange(inputValue);
    }, [setValue, inputValue, isUnique]);

    if (isPlainText) {
        return <p>{wpId}</p>;
    }
    return (
        <>
            <StyledDiv>
                <StyledInputWrap>
                    <StyledIconContainer>
                        <label htmlFor="WellPartner Id">WellPartner ID</label>
                        <ToolTip content="Specify a unique WellPartner ID">
                            <FaRegQuestionCircleIcon />
                        </ToolTip>
                    </StyledIconContainer>
                    <ErrorMessage
                        name="wpId"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledInputWrap>

                <TextField
                    id="filled-disabled"
                    sx={{ width: '100%' }}
                    label=""
                    placeholder="E.g 5321-1"
                    variant="filled"
                    {...register(fieldName as keyof ItemSchema)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    inputProps={{ name: 'isUnique', 'data-isunique': isUnique }}
                />

                {isLoading && <p>Checking...</p>}
                {wpId && (
                    <>
                        {isUnique === true && (
                            <StyledParagraph>WellPartner ID is unique!</StyledParagraph>
                        )}
                        {isUnique === false && (
                            <StyledParagraph $isUnique={isUnique}>
                                WellPartner ID is not unique. Please choose a different one.
                            </StyledParagraph>
                        )}
                    </>
                )}
            </StyledDiv>
        </>
    );
};
