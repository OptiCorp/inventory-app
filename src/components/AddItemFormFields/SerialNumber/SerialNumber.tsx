import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator.ts';
import { useIsSerialNumberUnique } from '../../../services/hooks/items/useIsSerialNumberUnique.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import {
    EllipsisText,
    StyledDiv,
    StyledErrorP,
    StyledIconContainer,
    StyledInputWrap,
} from '../styles.ts';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { StyledParagraph } from '../WpId/styles.ts';

type SerialNumberProps = {
    serialNumber?: string;
    fieldName: string;
    isPlainText?: boolean;
    onChange: (value: string) => void;
};
export const SerialNumber = ({
    serialNumber,
    fieldName,
    onChange,
    isPlainText,
}: SerialNumberProps) => {
    const { register, setValue } = useFormContext<ItemSchema>();
    const [inputValue, setInputValue] = useState(serialNumber!);
    const debouncedSerialNumber = useDebounce(serialNumber, 500);
    const { data: isUnique, isLoading } = useIsSerialNumberUnique(debouncedSerialNumber!);

    useEffect(() => {
        setValue(fieldName as keyof ItemSchema, inputValue);
        setValue('uniqueSerialNumber', isUnique!);
        onChange(inputValue);
    }, [setValue, inputValue, isUnique]);

    if (isPlainText) {
        return <EllipsisText>{serialNumber}</EllipsisText>;
    }

    return (
        <>
            <StyledDiv>
                <StyledInputWrap>
                    <StyledIconContainer>
                        <label htmlFor="Serial number">Serial number </label>
                        <ToolTip content="If left empty, a unique WP S/N will be generated">
                            <HelpOutlineIcon fontSize="small" />
                        </ToolTip>
                    </StyledIconContainer>
                    <ErrorMessage
                        name={`serialNumber[${0}]`}
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledInputWrap>
                <TextField
                    id="filled-disabled"
                    sx={{ width: '100%', padding: '0' }}
                    hiddenLabel
                    size="small"
                    {...register(fieldName as keyof ItemSchema)}
                    variant="filled"
                    placeholder="E.g 1-12-2023.1.2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {isLoading && <p>Checking...</p>}
                <>
                    {isUnique === true && (
                        <StyledParagraph>Serial number is unique!</StyledParagraph>
                    )}
                    {isUnique === false && (
                        <StyledParagraph $isUnique={isUnique}>
                            Serial number is not unique. Please choose a different one.
                        </StyledParagraph>
                    )}
                </>
            </StyledDiv>
        </>
    );
};
