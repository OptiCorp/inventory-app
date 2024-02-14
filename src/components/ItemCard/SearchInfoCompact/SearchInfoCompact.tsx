import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
} from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useGetItemById } from '../../../services/hooks/items/useGetItemById';
import { useGetItemTemplateById } from '../../../services/hooks/template/useGetItemTemplateById';
import { CustomDialog } from '../../CustomDialog/CustomDialog';
import { StyledAddIcon, StyledRemoveIcon } from '../../ListCard/styles';
import { ItemCardProps } from '../ItemCard';
import { useCardActions } from '../hooks/useCardActions';
import {
    StyledCompactBox,
    StyledCompactContent,
    StyledCompactDescriptionParagraph,
    StyledCompactDescriptionWrap,
    StyledCompactText,
    StyledCompactTitle,
    StyledItemCardCompactContainer,
} from './styles';

const SearchResultCardCompact = ({ item, icon }: ItemCardProps) => {
    const navigate = useNavigate();
    const { listId } = useParams();
    const {
        handleAdd,
        handleDelete,
        handleClickOpen,
        handleClose,
        addItemSuccess,
        alreadyAdded,
        open,
    } = useCardActions({ item: item });

    const { data: itemTemplateData } = useGetItemTemplateById(item.itemTemplate.id);
    const { data: itemById } = useGetItemById(item.id);

    return (
        <>
            <StyledItemCardCompactContainer>
                <Accordion
                    style={{
                        boxShadow: 'none',
                        borderRadius: '0px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledCompactBox>
                            <StyledCompactContent>
                                <StyledCompactTitle>ID</StyledCompactTitle>
                                <StyledCompactText>{item.wpId}</StyledCompactText>
                            </StyledCompactContent>
                            <StyledCompactContent>
                                <StyledCompactTitle>Vendor</StyledCompactTitle>
                                <StyledCompactText>
                                    {itemById?.vendor?.name ?? ''}
                                </StyledCompactText>
                            </StyledCompactContent>
                            <StyledCompactContent>
                                <StyledCompactTitle>Category</StyledCompactTitle>
                                <StyledCompactText>
                                    {itemTemplateData?.category?.name}
                                </StyledCompactText>
                            </StyledCompactContent>
                        </StyledCompactBox>
                    </AccordionSummary>
                    <AccordionDetails>
                        <StyledCompactDescriptionWrap>
                            <StyledCompactTitle>Description</StyledCompactTitle>
                            <StyledCompactDescriptionParagraph>
                                {item.itemTemplate?.description}
                            </StyledCompactDescriptionParagraph>
                        </StyledCompactDescriptionWrap>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button
                            component={NavLink}
                            to={`/${item.id}`}
                            onClick={() => navigate(`/item/${item.id}`)}
                        >
                            Show more
                        </Button>
                    </AccordionActions>
                </Accordion>
                {icon === 'add' ? (
                    <StyledAddIcon
                        alreadyAdded={alreadyAdded}
                        active={addItemSuccess}
                        style={{ fontSize: '25px' }}
                        onClick={(e) =>
                            handleAdd(e, {
                                itemId: item.id,
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
            </StyledItemCardCompactContainer>
            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={(event: React.MouseEvent) =>
                    handleDelete(event, {
                        itemId: item.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};

export default SearchResultCardCompact;
