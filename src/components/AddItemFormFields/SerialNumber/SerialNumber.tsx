import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useDebounce } from 'usehooks-ts';
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
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator.ts';
import { StyledParagraph } from '../WpId/styles.ts';

type SerialNumberProps = {
    serialNumber?: string;
    isPlainText?: boolean;
    onChange: (value: string) => void;
};
export const SerialNumber = ({ serialNumber, onChange, isPlainText }: SerialNumberProps) => {
    const debouncedSerialNumber = useDebounce(serialNumber, 500);
    const { data: isUnique = true, isLoading } = useIsSerialNumberUnique(debouncedSerialNumber!);
    const { setValue, watch } = useFormContext<ItemSchema>();
    useEffect(() => {
        const currentIsUnique = watch('uniqueSerialNumber');
        setValue('uniqueSerialNumber', currentIsUnique ? !!isUnique : false);
    }, [isUnique]);

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
                    variant="filled"
                    placeholder="E.g 1-12-2023.1.2"
                    value={serialNumber}
                    onChange={(e) => onChange(e.target.value)}
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
