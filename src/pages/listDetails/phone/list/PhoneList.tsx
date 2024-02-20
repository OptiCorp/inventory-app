import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { Button } from '../../../../components/Button/Button';
import { GlobalSpinner } from '../../../../components/GlobalSpinner/GlobalSpinner';

import SearchResultCardCompact from '../../../../components/ItemCard/SearchInfoCompact/SearchInfoCompact';

import AppContext from '../../../../contexts/AppContext';
import { Item, List, UpdateList } from '../../../../services/apiTypes';
import { useGetItemsInfinite } from '../../../../services/hooks/items/useGetItemsInfinite';
import { useGetListById } from '../../../../services/hooks/list/useGetListById';
import { useUpdateList } from '../../../../services/hooks/list/useUpdateList';
import { ListHeader } from '../../ListHeader';
import { ButtonWrapCompact, FlexWrapperCompact, ListContainerCompact } from './styles';
type Props = {
    list: List;
};
export const PhoneList = ({ list }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);

    const [searchTerm] = useState('');
    const { listId } = useParams();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { mutate: updateList } = useUpdateList(listId!);
    const { isLoading } = useGetItemsInfinite(debouncedSearchTerm);
    const { isFetching } = useGetListById(listId!);
    const navigate = useNavigate();
    const handleSave = () => {
        const save: UpdateList = { id: list.id, title: list.title };
        updateList(save, {
            onSuccess: (data) => {
                setSnackbarText(`${list.title} was saved`);
                navigate('/make-list');
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
                                        item={item}
                                        icon={'remove'}
                                    />
                                ))}
                            </ListContainerCompact>
                        ) : null}

                        <ButtonWrapCompact>
                            <Button variant="white">Export</Button>
                            <Button variant="black" onClick={handleSave}>
                                Save list
                            </Button>
                        </ButtonWrapCompact>
                    </FlexWrapperCompact>

                    {(isLoading || isFetching) && <GlobalSpinner />}
                </>
            )}
        </>
    );
};
