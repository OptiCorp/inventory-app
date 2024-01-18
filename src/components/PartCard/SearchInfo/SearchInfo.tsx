import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

import { usePartActions } from '../../../services/hooks/list/usePartCardActions';
import CustomDialog from '../../CustomDialog/CustomDialog';
import { StyledAddIcon, StyledInfoIcon, StyledRemoveIcon } from '../../ListCard/styles';
import { PartCardProps } from '../PartCard';
import { KeyWords } from '../styles';
import { DescriptionParagraph, FirstInfoBox, InfoP, SecondInfoBox, ThirdInfoBox } from './styles';

export const SearchInfo = ({ part, icon }: PartCardProps) => {
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
            <FirstInfoBox>
                <InfoP>
                    <KeyWords>WP ID</KeyWords>
                    {part.wpId}
                </InfoP>
                <InfoP>
                    <KeyWords> S/N</KeyWords>
                    {part.serialNumber}
                </InfoP>
                <InfoP>
                    <KeyWords> P/N</KeyWords>
                    {part.productNumber}
                </InfoP>
            </FirstInfoBox>
            <SecondInfoBox>
                <DescriptionParagraph>{part.description}</DescriptionParagraph>
            </SecondInfoBox>
            <ThirdInfoBox>
                {' '}
                <div style={{ alignSelf: 'flex-end' }}>
                    {icon === 'add' ? (
                        <StyledAddIcon
                            alreadyAdded={alreadyAdded}
                            active={addItemSuccess}
                            onClick={(e) =>
                                handleAdd(e, {
                                    itemId: part.id,
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
                </div>{' '}
                {location.pathname.includes('/makelist') && (
                    <StyledInfoIcon
                        onClick={() => {
                            navigate(`/${part.id}`);
                        }}
                    ></StyledInfoIcon>
                )}
                <InfoP>
                    <KeyWords>Location</KeyWords>
                    {part.location?.name ?? 'Location'}
                </InfoP>
                <InfoP>
                    <KeyWords>Vendor</KeyWords>
                    {part.vendor?.name ?? ''}
                </InfoP>
                <InfoP>
                    <KeyWords>{part.updatedDate ? 'Last updated' : 'Created on'}</KeyWords>
                    {format(
                        new Date(part.updatedDate ?? part.createdDate),
                        'yyyy-MM-dd HH:mm:ss'
                    ).toString()}
                </InfoP>
            </ThirdInfoBox>
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
