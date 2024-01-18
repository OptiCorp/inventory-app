import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartActions } from '../../services/hooks/list/usePartCardActions.tsx';
import { COLORS } from '../../style/GlobalStyles.ts';
import { Button } from '../Button/Button.tsx';
import CustomDialog from '../CustomDialog/CustomDialog.tsx';
import { StyledAddIcon, StyledRemoveIcon } from '../ListCard/styles.ts';
import { PartCardProps } from './PartCard.tsx';
import {
    ButtonText,
    CompactInfoP,
    DescriptionWrap,
    KeyWords,
    PartCardCompactContainer,
} from './styles.ts';

const SearchResultCardCompact = ({ part, icon }: PartCardProps) => {
    const { listId } = useParams();
    const navigate = useNavigate();

    const {
        handleAdd,
        handleDelete,
        handleClickOpen,
        handleClose,
        open,
        alreadyAdded,
        addItemSuccess,
    } = usePartActions({ part, icon }, listId);

    return (
        <>
            <PartCardCompactContainer>
                <Accordion
                    style={{
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        padding: '5px',
                    }}
                >
                    <AccordionSummary
                        style={{ alignItems: 'flex-end' }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <CompactInfoP>
                            <KeyWords>ID:</KeyWords>
                            {part.wpId}
                        </CompactInfoP>{' '}
                        <CompactInfoP>
                            <KeyWords>Location</KeyWords> {part.location?.name ?? 'Location'}
                        </CompactInfoP>
                        <CompactInfoP>
                            <KeyWords>Category</KeyWords> {part.category?.name ?? 'Category'}
                        </CompactInfoP>
                    </AccordionSummary>
                    <AccordionDetails style={{ alignItems: 'flex-end' }}>
                        <DescriptionWrap>
                            <KeyWords>Description</KeyWords>{' '}
                            <Typography>{part.description}</Typography>
                        </DescriptionWrap>
                        <Button
                            backgroundColor={`${COLORS.white}`}
                            height="20px"
                            color={`${COLORS.black}`}
                            onClick={() => navigate(`/${part.id}`)}
                        >
                            <ButtonText> More info</ButtonText>
                        </Button>
                    </AccordionDetails>
                </Accordion>
                {icon === 'add' ? (
                    <StyledAddIcon
                        alreadyAdded={alreadyAdded}
                        active={addItemSuccess}
                        style={{ fontSize: '25px' }}
                        onClick={(e) =>
                            handleAdd(e, {
                                itemId: part.id,
                                listId: listId!,
                            })
                        }
                    ></StyledAddIcon>
                ) : null}
                {icon === 'remove' ? (
                    <StyledRemoveIcon
                        style={{ fontSize: '25px' }}
                        onClick={handleClickOpen}
                    ></StyledRemoveIcon>
                ) : null}
            </PartCardCompactContainer>

            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={() => handleClose}
                SubmitButtonOnClick={(e) =>
                    handleDelete(e, {
                        itemId: part.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};

export default SearchResultCardCompact;
