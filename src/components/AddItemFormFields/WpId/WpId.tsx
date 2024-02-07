import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { useDebounce } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';
import { useIsWpIdUnique } from '../../../services/hooks/items/useIsWpIdUnique.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';
import { StyledParagraph } from './styles.ts';

type WpIdProps = {
    index?: number;
    isEdit?: boolean;
    wpId: string;
};
export const WpId = ({ index, isEdit, wpId }: WpIdProps) => {
    const { register, setValue } = useFormContext();

    const debouncedWpId = useDebounce(wpId, 500);
    const { data: isUnique, isLoading } = useIsWpIdUnique(debouncedWpId);

    useEffect(() => {
        setValue('wpId', wpId);
        setValue('uniqueWpId', isUnique);
    }, [setValue, wpId, isUnique]);
    console.log(index);
    return (
        <>
            {!isEdit && <p>{wpId}</p>}
            {isEdit && (
                <StyledDiv>
                    <StyledInputWrap>
                        <StyledIconContainer>
                            <label htmlFor="WellPartner Id">
                                WellPartner ID {index && `(${index})`}
                            </label>
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
                        {...register('wpId')}
                        value={wpId}
                        onChange={(e) => setWpId(e.target.value)}
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
            )}
        </>
    );
};
