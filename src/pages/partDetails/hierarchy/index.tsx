import EditIcon from '@mui/icons-material/Edit';
import { Box, ClickAwayListener } from '@mui/material';
import { useContext, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDebounce } from 'usehooks-ts';
import UmAppContext from '../../../contexts/UmAppContext';
import { Item } from '../../../services/apiTypes';
import {
    AccessibleButtonWrapper,
    AddIcon,
    ChildItemContainer,
    ChildItemSearchContainer,
    CustomRemoveIcon,
    FlexContainer,
    LinkElement,
    ParentContainer,
} from './styles';
import { useGetItemsInfinite } from '../../../services/hooks/items/useGetItemsInfinite';
import { useUpdateItem } from '../../../services/hooks/items/useUpdateItem';
import { useRemoveParentIdFromItem } from '../../../services/hooks/items/useRemoveParentIdFromItem';
import {
    AddChildItemIds,
    useAddChildItemToParent,
} from '../../../services/hooks/items/useAddChildItemToParent';
import { PartInfoSchema } from '../partInfo/hooks';
import { Edit, LabelContainer } from '../partInfo/styles';

type Options = {
    label: string;
    value: Item;
};
type Field =
    | {
          label: string;
          value: Item | string;
      }
    | string
    | null
    | undefined;

export const Hierarchy = ({ item }: { item: Item }) => {
    const { currentUser, setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChildItem, setSelectedChildItem] = useState({
        childItemId: '',
        childItemWpId: '',
    });
    const [isOpen, setIsOpen] = useState({
        parent: false,
        child: false,
    });
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const { data, isLoading, fetchNextPage } = useGetItemsInfinite(searchTerm);
    const { mutate: mutateUpdateItem } = useUpdateItem(item.id, currentUser!.id);
    const { mutate: mutateRemoveParentFromItem } = useRemoveParentIdFromItem();
    const { mutate: mutateAddChildItemToParent } = useAddChildItemToParent();
    const navigate = useNavigate();
    const {
        watch,
        register,
        control,
        formState: { dirtyFields },
    } = useFormContext<PartInfoSchema>();
    const filteredWpIds = data?.pages
        .flatMap((el) => el)
        .filter(
            (el) =>
                el.wpId?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
                el.wpId !== item.wpId
        )
        .map((el) => ({ label: el.wpId, value: el }));

    const filterChildIds = (options: Options[]) => {
        const childIds = item.children?.map((child) => child.id) ?? [];
        return options?.filter((option) => !childIds.includes(option.value.id));
    };

    /**
     * Handles the logic for displaying snackbar messages based on API response
     *
     * @param {Response} responseData - The API response data.
     * @param {string} successText - The text to display in the snackbar if the request is successful.
     * @param {string} [updatedElement] - Optional: The element that was updated.
     * @returns {void}
     */
    const handleApiRequestSnackbar = (
        responseData: Response,
        successText: string,
        updatedElement?: string
    ): void => {
        if (responseData.status >= 400 && responseData.status < 500) {
            setSnackbarSeverity('error');
            setSnackbarText(`${responseData.statusText}, please try again.`);
            return;
        } else if (responseData.status >= 500) {
            setSnackbarSeverity('error');
            setSnackbarText(`Something went wrong on our end, refresh page and try again later.`);
            return;
        } else {
            setSnackbarText(`${successText}${updatedElement ? `: ${updatedElement}` : ''}`);
        }
    };

    const handleBlur = (fieldId: keyof PartInfoSchema, fieldName: keyof PartInfoSchema) => {
        const fieldValue: Field = watch(fieldName);
        console.log(fieldValue);
        if (
            dirtyFields[fieldName] &&
            fieldValue &&
            typeof fieldValue === 'object' &&
            typeof fieldValue.value === 'object'
        ) {
            mutateUpdateItem(
                {
                    ...item,
                    [fieldId]: fieldValue.value.id,
                },
                {
                    onSuccess: (data) => {
                        handleApiRequestSnackbar(
                            data,
                            'Parent item was changed to WP ID',
                            fieldValue.label
                        );
                    },
                }
            );
        }
    };

    const handleAddChildToParent = (ids: AddChildItemIds) => {
        if (ids.childItemId === ids.itemId) {
            setSnackbarText('Cant add itself as child');
            setSnackbarSeverity('warning');
            return;
        }

        mutateAddChildItemToParent(ids, {
            onSuccess: (data) => {
                handleApiRequestSnackbar(data, 'item added');
            },
        });
    };

    const handleRemoveItem = (id: string) => {
        mutateRemoveParentFromItem(id, {
            onSuccess: (data) => {
                handleApiRequestSnackbar(data, 'Item removed');
            },
        });
    };

    const clickAwayHandlerParent = () => {
        setIsOpen((prev) => ({ ...prev, parent: false }));
    };

    const clickAwayHandlerChild = () => {
        setIsOpen((prev) => ({ ...prev, child: false }));
        setSelectedChildItem({
            childItemId: '',
            childItemWpId: '',
        });
    };

    return (
        <div>
            <ParentContainer>
                <ClickAwayListener onClickAway={clickAwayHandlerParent}>
                    <Box>
                        <LabelContainer>
                            <label>
                                <strong>{`This ${item.type} is a part of:`}</strong>
                            </label>
                            <Edit
                                onClick={() =>
                                    setIsOpen((prev) => ({
                                        ...prev,
                                        parent: true,
                                    }))
                                }
                            />
                        </LabelContainer>

                        <Controller
                            control={control}
                            name="parentId"
                            render={(controllerProps) => {
                                const {
                                    field: { onChange },
                                } = controllerProps;
                                return (
                                    <Select
                                        {...register('parentId')}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                maxWidth: '300px',
                                                borderRadius: '0',
                                            }),
                                        }}
                                        onInputChange={(value) => setSearchTerm(value)}
                                        onMenuScrollToBottom={() => {
                                            fetchNextPage().catch((error) => {
                                                console.error('An error occurred:', error);
                                            });
                                        }}
                                        options={filterChildIds(filteredWpIds!)}
                                        isLoading={isLoading}
                                        placeholder="Search by wpid..."
                                        onChange={onChange}
                                        onBlur={() => handleBlur('parentId', 'parentId')}
                                    />
                                );
                            }}
                        />

                        <div style={{ position: 'relative', width: 'fit-content' }}>
                            <LinkElement onClick={() => navigate(`/${item.parent?.id}`)}>
                                {item.parent?.wpId}
                            </LinkElement>
                            {isOpen.parent && item.parent?.id && (
                                <AccessibleButtonWrapper onClick={() => handleRemoveItem(item.id)}>
                                    <CustomRemoveIcon />
                                </AccessibleButtonWrapper>
                            )}
                        </div>
                    </Box>
                </ClickAwayListener>
            </ParentContainer>

            <ClickAwayListener onClickAway={clickAwayHandlerChild}>
                <Box>
                    <FlexContainer>
                        {item.children?.map((childItem) => {
                            return (
                                <ChildItemContainer key={childItem.wpId}>
                                    <LinkElement onClick={() => navigate(`/${childItem.id}`)}>
                                        {childItem.wpId}
                                    </LinkElement>

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
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    margin: 0,
                                }}
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
        </div>
    );
};
