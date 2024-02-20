import { ErrorMessage } from '@hookform/error-message';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { useIsWpIdUnique } from '../../../services/hooks/items/useIsWpIdUnique';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledInputWrap } from '../styles';
import { StyledParagraph } from './styles';

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
                    <label htmlFor="WellPartner Id">WellPartner ID</label>

                    <ToolTip content="Specify a unique WellPartner ID">
                        <HelpOutlineIcon fontSize="small" />
                    </ToolTip>

                    <ErrorMessage
                        name={`wpId[${0}]`}
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledInputWrap>

                <TextField
                    id="filled-disabled"
                    sx={{ width: '100%' }}
                    error={!isUnique}
                    hiddenLabel
                    placeholder="E.g 5321-1"
                    variant="filled"
                    size="small"
                    {...(register(fieldName as keyof ItemSchema),
                    {
                        required: true,
                    })}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    inputProps={{ name: 'isUnique', 'data-isunique': isUnique }}
                />

                {isLoading && <span>Checking...</span>}
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
