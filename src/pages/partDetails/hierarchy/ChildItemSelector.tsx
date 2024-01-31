import { AlertColor, Box, ClickAwayListener } from '@mui/material';
import {
    AccessibleButtonWrapper,
    AddIcon,
    ChildItemContainer,
    ChildItemSearchContainer,
    CustomRemoveIcon,
    FlexContainer,
    StyledLinkElement,
} from './styles';
import { Open, SetState } from '../partInfo/types';
import Select from 'react-select';
import { useGetItemsInfinite } from '../../../services/hooks/items/useGetItemsInfinite';
import { Item } from '../../../services/apiTypes';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    AddChildItemIds,
    useAddChildItemToParent,
} from '../../../services/hooks/items/useAddChildItemToParent';
import { handleApiRequestSnackbar } from '../../../utils/handleApiRequestSnackbar';
import EditIcon from '@mui/icons-material/Edit';
import { LabelContainer } from '../partInfo/styles';

type ChildItemSelector = {
    item: Item;
    setIsOpen: SetState<Open>;
    isOpen: Open;
    searchTerm: string;
    setSearchTerm: SetState<string>;
    handleRemoveItem: (id: string) => void;
    filteredWpIds:
        | {
              label: string;
              value: Item;
          }[]
        | undefined;
    setSnackbarText: SetState<string>;
    setSnackbarSeverity: SetState<AlertColor>;
};
export const ChildItemSelector = ({
    item,
    setIsOpen,
    isOpen,
    searchTerm,
    setSearchTerm,
    handleRemoveItem,
    filteredWpIds,
    setSnackbarText,
    setSnackbarSeverity,
}: ChildItemSelector) => {
    const navigate = useNavigate();
    const { mutate: mutateAddChildItemToParent } = useAddChildItemToParent();
    const { isLoading, fetchNextPage } = useGetItemsInfinite(searchTerm);
    const [selectedChildItem, setSelectedChildItem] = useState({
        childItemId: '',
        childItemWpId: '',
    });

    const handleAddChildToParent = (ids: AddChildItemIds) => {
        if (ids.childItemId === ids.itemId) {
            setSnackbarSeverity('warning');
            setSnackbarText("Can't add itself as child");
            return;
        }

        mutateAddChildItemToParent(ids, {
            onSuccess: (data) => {
                handleApiRequestSnackbar(data, 'item added', setSnackbarSeverity, setSnackbarText);
            },
        });
    };

    const clickAwayHandler = () => {
        setIsOpen((prev) => ({ ...prev, child: false }));
        setSelectedChildItem({
            childItemId: '',
            childItemWpId: '',
        });
    };
    return (
        <ClickAwayListener onClickAway={clickAwayHandler}>
            <Box>
                <LabelContainer>
                    <label>
                        <strong>{`This ${item.itemTemplate.type.toLowerCase()} consists of:`}</strong>
                    </label>
                </LabelContainer>
                <FlexContainer>
                    {item.children?.map((childItem) => {
                        return (
                            <ChildItemContainer key={childItem.wpId}>
                                <StyledLinkElement onClick={() => navigate(`/${childItem.id}`)}>
                                    {childItem.wpId}
                                </StyledLinkElement>

                                {isOpen.child && (
                                    <AccessibleButtonWrapper
                                        onClick={() => handleRemoveItem(childItem.id)}
                                    >
                                        <CustomRemoveIcon />
                                    </AccessibleButtonWrapper>
                                )}
                            </ChildItemContainer>
                        );
                    })}
                    {!isOpen.child && !!item.children?.length && (
                        <AccessibleButtonWrapper
                            onClick={() =>
                                setIsOpen((prev) => ({
                                    ...prev,
                                    child: true,
                                }))
                            }
                        >
                            <EditIcon />
                        </AccessibleButtonWrapper>
                    )}
                </FlexContainer>

                <ChildItemSearchContainer>
                    <Select
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minWidth: '300px',
                                borderRadius: '0',
                            }),
                        }}
                        options={filteredWpIds}
                        onInputChange={(value) => setSearchTerm(value)}
                        isLoading={isLoading}
                        onMenuScrollToBottom={() => {
                            fetchNextPage().catch((error) => {
                                console.error('An error occurred:', error);
                            });
                        }}
                        placeholder="Search for item to add.."
                        onChange={(value) =>
                            setSelectedChildItem({
                                childItemId: value!.value.id,
                                childItemWpId: value!.value.wpId,
                            })
                        }
                        value={
                            selectedChildItem.childItemWpId.length > 0
                                ? {
                                      value: {
                                          id: selectedChildItem.childItemId,
                                          wpId: selectedChildItem.childItemWpId,
                                      },
                                      label: `${selectedChildItem.childItemWpId}`,
                                  }
                                : null
                        }
                    />

                    <AddIcon
                        disabled={selectedChildItem.childItemWpId.length <= 0}
                        onClick={() => {
                            if (selectedChildItem.childItemWpId.length <= 0) return;
                            handleAddChildToParent({
                                itemId: item.id,
                                childItemId: selectedChildItem.childItemId,
                            });
                            setSelectedChildItem({
                                childItemId: '',
                                childItemWpId: '',
                            });
                        }}
                    />
                </ChildItemSearchContainer>
            </Box>
        </ClickAwayListener>
    );
};
