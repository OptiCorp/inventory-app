import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { ErrorP, IconContainer, InputWrap, StyledInput } from './styles';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useIsWpIdUnique } from '../../../services/hooks/Items/useIsWpIdUnique.tsx';
import { useDebounce } from 'usehooks-ts';
import { ToolTip } from '../../ToolTip';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { StyledDiv } from '../Category/styles.ts';

export const WpId = () => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const [wpId, setWpId] = useState(uuid().slice(0, 8));
    const debouncedWpId = useDebounce(wpId, 500);
    const { data: isUnique, isLoading } = useIsWpIdUnique(debouncedWpId);

    useEffect(() => {
        setValue('wpId', wpId);
        setValue('uniqueWpId', isUnique);
    }, [setValue, wpId, isUnique]);

    return (
        <StyledDiv>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="WellPartner Id">WellPartner ID </label>{' '}
                    <ToolTip content="Specify a unique WellPartner ID">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage name="wpId" render={({ message }) => <ErrorP>{message}</ErrorP>} />
            </InputWrap>
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
                        <p style={{ color: 'green', marginTop: '0px' }}>
                            WellPartner ID is unique!
                        </p>
                    )}
                    {isUnique === false && (
                        <p style={{ color: 'red', marginTop: '0px' }}>
                            WellPartner ID is not unique. Please choose a different one.
                        </p>
                    )}
                </>
            )}
        </StyledDiv>
    );
};
