import { ErrorMessage } from '@hookform/error-message';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { CustomDialog } from '../../CustomDialog/CustomDialog';
import { WpId } from '../WpId/WpId';
import {
    ScrollWrapContainer,
    StyledErrorP,
    StyledIconContainer,
    StyledLabelContainer,
} from '../styles';

export const WpIds = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { control } = useFormContext<ItemSchema>();
    const {
        field: { value, onChange },
    } = useController({ name: 'wpId', control });
    return (
        <>
            <div>
                <StyledLabelContainer>
                    <StyledIconContainer>
                        <label>
                            <strong>WP ids</strong>
                        </label>
                        <Edit onClick={() => setIsOpen((prev) => !prev)} />
                    </StyledIconContainer>
                    <ErrorMessage
                        name={`wpId[0]`}
                        as="span"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledLabelContainer>

                <ScrollWrapContainer>
                    {value.map((wpId, index) => {
                        return (
                            <WpId
                                key={index}
                                wpId={wpId}
                                isPlainText
                                onChange={(newValue: string) => {
                                    const newValues = [...value];
                                    newValues[index] = newValue;
                                    onChange(newValues);
                                }}
                            />
                        );
                    })}
                </ScrollWrapContainer>
            </div>
            <CustomDialog
                open={isOpen}
                fullWidth={true}
                onClose={() => setIsOpen((prev) => !prev)}
                title="Edit WpIds"
                CancelButtonOnClick={() => setIsOpen((prev) => !prev)}
                SubmitButtonOnClick={() => setIsOpen((prev) => !prev)}
            >
                {value.map((wpId, index) => {
                    return (
                        <div key={index}>
                            <WpId
                                wpId={wpId}
                                onChange={(newValue: string) => {
                                    const newValues = [...value];
                                    newValues[index] = newValue;
                                    onChange(newValues);
                                }}
                            />
                        </div>
                    );
                })}
            </CustomDialog>
        </>
    );
};
