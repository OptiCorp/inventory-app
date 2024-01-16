import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { Button } from '../../../../components/Button/Button';
import { GlobalSpinner } from '../../../../components/GlobalSpinner/GlobalSpinner';
import SearchResultCardCompact from '../../../../components/ResultSearchCard/SearchInfoCompact';
import UmAppContext from '../../../../contexts/UmAppContext';
import { useSnackBar } from '../../../../hooks';
import { Item, List, UpdateList } from '../../../../services/apiTypes';
import { useGetItemsNotInListInfinite } from '../../../../services/hooks/items/useGetItemsNotInListInfinite';
import { useGetListById } from '../../../../services/hooks/list/useGetListById';
import { useUpdateList } from '../../../../services/hooks/list/useUpdateList';
import { COLORS } from '../../../../style/GlobalStyles';
import { ListHeader } from '../../ListHeader';
import { ButtonWrapCompact, FlexWrapperCompact, ListContainerCompact } from './styles';
type Props = {
    list: List;
};
export const PhoneList = ({ list }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);

    const [searchTerm, setSearchTerm] = useState('');
    const { listId } = useParams();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { mutate: updateList, status: listUpdateStatus, data } = useUpdateList(listId!);

    const { data: items, isLoading } = useGetItemsNotInListInfinite(debouncedSearchTerm, listId!);

    const { data: DataList, isFetching } = useGetListById(listId!);

    const { snackbar } = useSnackBar();
    const navigate = useNavigate();
    const handleSave = () => {
        const save: UpdateList = { id: list.id, title: list.title };
        updateList(save, {
            onSuccess: (data) => {
                setSnackbarText(`${list.title} was saved`);
                navigate('/makelist');
                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });
    };

    return (
        <>
            {list && (
                <>
                    <FlexWrapperCompact>
                        <ListHeader list={list} />
                        {list?.items ? (
                            <ListContainerCompact>
                                {list.items.map((item: Item) => (
                                    <SearchResultCardCompact
                                        key={item.id}
                                        part={item}
                                        icon={'remove'}
                                    />
                                    // <SideList part={item} key={item.id} />
                                ))}
                            </ListContainerCompact>
                        ) : null}
                        »
                        <ButtonWrapCompact>
                            <Button
                                backgroundColor={`${COLORS.secondary}`}
                                color={`${COLORS.primary}`}
                            >
                                Export
                            </Button>
                            <Button
                                backgroundColor={`${COLORS.primary}`}
                                color={`${COLORS.secondary}`}
                                onClick={handleSave}
                            >
                                Save list
                            </Button>
                        </ButtonWrapCompact>
                    </FlexWrapperCompact>
                    {snackbar}
                    {(isLoading || isFetching) && <GlobalSpinner />}
                </>
            )}
        </>
    );
};
