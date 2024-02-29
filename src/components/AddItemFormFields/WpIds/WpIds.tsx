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
    const [oldWpIds, setOldWpIds] = useState(value);
    const [wpIds, setWpIds] = useState(value);

    const handleCancel = () => {
        setIsOpen((prev) => !prev);
        setWpIds(oldWpIds);
    };
    const handleChange = (newValue: string, index: number) => {
        const newValues = [...value];
        newValues[index] = newValue;
        setWpIds(newValues);
    };

    const handleSave = () => {
        onChange(wpIds);
        setOldWpIds(wpIds);
        setIsOpen((prev) => !prev);
    };
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
                    {wpIds.map((wpId, index) => {
                        return (
                            <WpId
                                key={wpId}
                                wpId={wpId}
                                isPlainText
                                onChange={(value) => handleChange(value, index)}
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
                CancelButtonOnClick={handleCancel}
                SubmitButtonOnClick={handleSave}
            >
                {wpIds.map((wpId, index) => {
                    return (
                        <div key={index}>
                            <WpId wpId={wpId} onChange={(value) => handleChange(value, index)} />
                        </div>
                    );
                })}
            </CustomDialog>
        </>
    );
};
