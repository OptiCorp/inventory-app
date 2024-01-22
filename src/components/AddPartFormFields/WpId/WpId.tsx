import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { useDebounce } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';
import { useIsWpIdUnique } from '../../../services/hooks/items/useIsWpIdUnique.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';
import { StyledInput, StyledParagraph } from './styles.ts';

export const WpId = () => {
    const { register, setValue } = useFormContext();

    const [wpId, setWpId] = useState(uuid().slice(0, 8));
    const debouncedWpId = useDebounce(wpId, 500);
    const { data: isUnique, isLoading } = useIsWpIdUnique(debouncedWpId);

    useEffect(() => {
        setValue('wpId', wpId);
        setValue('uniqueWpId', isUnique);
    }, [setValue, wpId, isUnique]);

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="WellPartner Id">WellPartner ID </label>{' '}
                    <ToolTip content="Specify a unique WellPartner ID">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="wpId"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <StyledInput
                type="text"
                placeholder="E.g 5321-1"
                {...register('wpId')}
                autoComplete="off"
                value={wpId}
                onChange={(e) => setWpId(e.target.value)}
                isUnique={isUnique?.toString()}
            />
            {isLoading && <p>Checking...</p>}
            {wpId && (
                <>
                    {isUnique === true && (
                        <StyledParagraph>WellPartner ID is unique!</StyledParagraph>
                    )}
                    {isUnique === false && (
                        <StyledParagraph>
                            WellPartner ID is not unique. Please choose a different one.
                        </StyledParagraph>
                    )}
                </>
            )}
        </StyledDiv>
    );
};
