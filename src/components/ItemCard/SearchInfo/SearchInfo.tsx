import { useNavigate, useParams } from 'react-router-dom';
import { CustomDialog } from '../../CustomDialog/CustomDialog';
import { StyledAddIcon, StyledInfoIcon, StyledRemoveIcon } from '../../ListCard/styles';
import { ItemCardProps } from '../ItemCard';
import { useCardActions } from '../hooks/useCardActions';
import {
    StyledBox,
    StyledContainer,
    StyledContent,
    StyledDescriptionParagraph,
    StyledSecondInfoBox,
    StyledText,
    StyledTitle,
} from './styles';

export const SearchInfo = ({ item, icon }: ItemCardProps) => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const {
        handleAdd,
        handleDelete,
        handleClickOpen,
        handleClose,
        addItemSuccess,
        alreadyAdded,
        open,
    } = useCardActions({ item: item });

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <StyledContent>
                        <StyledTitle>S/N</StyledTitle>
                        <StyledText>{item.serialNumber}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>P/N</StyledTitle>
                        <StyledText>{item.itemTemplate?.productNumber}</StyledText>
                    </StyledContent>
                </StyledBox>
                <StyledSecondInfoBox>
                    <StyledDescriptionParagraph>
                        {item.itemTemplate?.description}
                    </StyledDescriptionParagraph>
                </StyledSecondInfoBox>
                <StyledBox>
                    <>
                        {icon === 'add' ? (
                            <StyledAddIcon
                                alreadyAdded={alreadyAdded}
                                active={addItemSuccess}
                                onClick={(e) =>
                                    handleAdd(e, {
                                        itemId: item.id,
                                        listId: listId!,
                                    })
                                }
                            ></StyledAddIcon>
                        ) : (
                            icon === 'remove' && (
                                <StyledRemoveIcon
                                    style={{ fontSize: '25px' }}
                                    onClick={handleClickOpen}
                                ></StyledRemoveIcon>
                            )
                        )}
                    </>
                    {location.pathname.includes('/make-list') && (
                        <StyledInfoIcon
                            onClick={() => {
                                navigate(`/${item.id}`);
                            }}
                        ></StyledInfoIcon>
                    )}
                    <StyledContent>
                        <StyledTitle>Location</StyledTitle>
                        <StyledText>{item.location?.name ?? 'Location'}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Category</StyledTitle>
                        <StyledText>{item.itemTemplate?.category.name}</StyledText>
                    </StyledContent>
                </StyledBox>
            </StyledContainer>
            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={(e) =>
                    handleDelete(e, {
                        itemId: item.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};
