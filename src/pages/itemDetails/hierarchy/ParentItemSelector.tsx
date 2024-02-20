import { AlertColor, Box, ClickAwayListener } from '@mui/material';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import AppContext from '../../../contexts/AppContext';
import { Item } from '../../../services/apiTypes';
import { useGetItemsInfinite } from '../../../services/hooks/items/useGetItemsInfinite';
import { useUpdateItem } from '../../../services/hooks/items/useUpdateItem';
import { handleApiRequestSnackbar } from '../../../utils/handleApiRequestSnackbar';
import { ItemInfoSchema } from '../itemInfo/hooks';
import { Edit, LabelContainer } from '../itemInfo/styles';
import { Open, Options, SetState } from '../itemInfo/types';
import {
    AccessibleButtonWrapper,
    CustomRemoveIcon,
    ParentContainer,
    StyledContainer,
    StyledLinkElement,
} from './styles';

type Field =
    | {
          label: string;
          value: Item | string;
      }
    | string
    | null
    | undefined;

type ParentItemSelectorProps = {
    item: Item;
    searchTerm: string;
    handleRemoveItem: (id: string) => void;
    setIsOpen: SetState<Open>;
    setSearchTerm: SetState<string>;
    isOpen: Open;
    setSnackbarText: SetState<string>;
    setSnackbarSeverity: SetState<AlertColor>;
    filteredWpIds:
        | {
              label: string;
              value: Item;
          }[]
        | undefined;
};
export const ParentItemSelector = ({
    item,
    searchTerm,
    handleRemoveItem,
    setIsOpen,
    setSearchTerm,
    isOpen,
    filteredWpIds,
    setSnackbarText,
    setSnackbarSeverity,
}: ParentItemSelectorProps) => {
    const { currentUser } = useContext(AppContext);
    const navigate = useNavigate();
    const {
        register,
        control,
        watch,
        formState: { dirtyFields },
    } = useFormContext<ItemInfoSchema>();
    const { isLoading, fetchNextPage } = useGetItemsInfinite(searchTerm);
    const { mutate: mutateUpdateItem } = useUpdateItem(item?.id, currentUser!.id);

    const filterChildIds = (options: Options[]) => {
        const childIds = item.children?.map((child) => child?.id) ?? [];
        return options?.filter((option) => !childIds.includes(option.value?.id));
    };

    const clickAwayHandler = () => {
        setIsOpen((prev) => ({ ...prev, parent: false }));
    };

    const handleBlur = (fieldId: keyof ItemInfoSchema, fieldName: keyof ItemInfoSchema) => {
        const fieldValue: Field = watch(fieldName) as Field;

        if (
            dirtyFields[fieldName] &&
            fieldValue &&
            typeof fieldValue === 'object' &&
            typeof fieldValue.value === 'object'
        ) {
            mutateUpdateItem(
                {
                    ...item,
                    [fieldId]: fieldValue.value?.id,
                },
                {
                    onSuccess: (data) => {
                        handleApiRequestSnackbar(
                            data,
                            'Parent item was changed to WP ID',
                            setSnackbarSeverity,
                            setSnackbarText,
                            fieldValue.label
                        );
                    },
                }
            );
        }
    };
    return (
        <ParentContainer>
            <ClickAwayListener onClickAway={clickAwayHandler}>
                <Box>
                    <LabelContainer>
                        <label>
                            <strong>{`This item is a part of:`}</strong>
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

                    <StyledContainer>
                        <StyledLinkElement onClick={() => navigate(`/item/${item.parent?.id}`)}>
                            {item.parent?.wpId}
                        </StyledLinkElement>
                        {isOpen.parent && item.parent?.id && (
                            <AccessibleButtonWrapper onClick={() => handleRemoveItem(item?.id)}>
                                <CustomRemoveIcon fontSize="small" />
                            </AccessibleButtonWrapper>
                        )}
                    </StyledContainer>
                    {isOpen.parent && (
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
                                            option: (base) => ({
                                                ...base,
                                                width: '300px',
                                            }),
                                            container: (base) => ({ ...base, width: '300px' }),
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
                    )}
                </Box>
            </ClickAwayListener>
        </ParentContainer>
    );
};
