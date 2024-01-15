import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Item } from '../../../services/apiTypes';
import { COLORS } from '../../../style/GlobalStyles';
import { Wrapper } from './styles';

export const Comments = ({ item }: { item: Item }) => {
    const [content, setContent] = useState(item?.comment);
    return (
        <>
            <div>
                <div>
                    {' '}
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows={5}
                        defaultValue={item.comment ?? content}
                        fullWidth
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setContent(e.target.value);
                        }}
                        key={item?.wpId ?? ''}
                        variant="filled"
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
                </div>
                <Wrapper>
                    <Button backgroundColor={`${COLORS.secondary}`} color={`${COLORS.primary}`}>
                        Sumbit
                    </Button>
                </Wrapper>
            </div>
        </>
    );
};
