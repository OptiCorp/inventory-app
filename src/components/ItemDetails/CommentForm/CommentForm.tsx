import { Button, TextField } from '@mui/material';
import { FormEvent, useContext } from 'react';
import { Item } from '../../../services/apiTypes';
import { Wrapper } from './styles';
import { Controller, useFormContext } from 'react-hook-form';
import { ItemInfoSchema } from '../../../pages/itemDetails/itemInfo/hooks';
import { useUpdateItem } from '../../../services/hooks/items/useUpdateItem';
import AppContext from '../../../contexts/AppContext';
import { handleApiRequestSnackbar } from '../../../utils/handleApiRequestSnackbar';

export const Comments = ({ item }: { item: Item }) => {
    const {
        watch,
        register,
        formState: { dirtyFields },
        control,
    } = useFormContext<ItemInfoSchema>();
    const { currentUser, setSnackbarSeverity, setSnackbarText } = useContext(AppContext);
    const { mutate } = useUpdateItem(item?.id, currentUser!.id);

    const commentValue = watch('comment');
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (dirtyFields.comment) {
            mutate(
                {
                    ...item,
                    comment: commentValue,
                },
                {
                    onSuccess: (responseData) => {
                        handleApiRequestSnackbar(
                            responseData,
                            'Comment updated.',
                            setSnackbarSeverity,
                            setSnackbarText
                        );
                    },
                }
            );
        }
    };

    return (
        <>
            <h4>Comments</h4>
            <form onSubmit={onSubmit}>
                <div>
                    <Controller
                        control={control}
                        name="comment"
                        render={(controllerProps) => {
                            const {
                                field: { onChange },
                            } = controllerProps;

                            return (
                                <TextField
                                    id="filled-multiline-static"
                                    {...register('comment')}
                                    multiline
                                    rows={5}
                                    fullWidth
                                    onChange={onChange}
                                    variant="filled"
                                    InputProps={{ sx: { borderRadius: 0 } }}
                                    sx={{
                                        '&::before': {
                                            display: 'none',
                                        },
                                        '&:focus-within': {
                                            outline: '2px solid var(--Textarea-focusedHighlight)',
                                            outlineOffset: '2px',
                                        },
                                    }}
                                />
                            );
                        }}
                    />
                </div>
                <Wrapper>
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ borderRadius: '0', height: '40px', width: '200px' }}
                    >
                        Sumbit
                    </Button>
                </Wrapper>
            </form>
        </>
    );
};
