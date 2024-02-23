import { ErrorMessage } from '@hookform/error-message';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { TextField } from '@mui/material';
import { useDebounce } from 'usehooks-ts';
import { useIsWpIdUnique } from '../../../services/hooks/items/useIsWpIdUnique';
import { ToolTip } from '../../ToolTip/ToolTip';
import { EllipsisText, StyledDiv, StyledErrorP, StyledInputWrap } from '../styles';
import { StyledParagraph } from './styles';

type WpIdProps = {
    wpId: string;
    isPlainText?: boolean;
    onChange: (value: string) => void;
};

export const WpId = ({ wpId, onChange, isPlainText }: WpIdProps) => {
    const debouncedWpId = useDebounce(wpId, 500);
    const { data: isUnique, isLoading } = useIsWpIdUnique(debouncedWpId);

    if (isPlainText) {
        return <EllipsisText>{wpId}</EllipsisText>;
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
                    value={wpId}
                    onChange={(e) => onChange(e.target.value)}
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
