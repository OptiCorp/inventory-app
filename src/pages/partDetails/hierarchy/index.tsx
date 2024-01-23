import { useContext, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import UmAppContext from '../../../contexts/UmAppContext';
import { Item } from '../../../services/apiTypes';
import { useGetItemsInfinite } from '../../../services/hooks/items/useGetItemsInfinite';
import { useRemoveParentIdFromItem } from '../../../services/hooks/items/useRemoveParentIdFromItem';
import { handleApiRequestSnackbar } from '../handleApiRequestSnackbar';
import { ParentItemSelector } from './ParentItemSelector';
import { ChildItemSelector } from './ChildItemSelector';

export const Hierarchy = ({ item }: { item: Item }) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState({
        parent: false,
        child: false,
    });
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const { data } = useGetItemsInfinite(searchTerm);
    const { mutate: mutateRemoveParentFromItem } = useRemoveParentIdFromItem();

    const filteredWpIds = data?.pages
        .flatMap((el) => el)
        .filter(
            (el) =>
                el.wpId?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
                el.wpId !== item.wpId
        )
        .map((el) => ({ label: el.wpId, value: el }));

    const handleRemoveItem = (id: string) => {
        mutateRemoveParentFromItem(id, {
            onSuccess: (data) => {
                handleApiRequestSnackbar(
                    data,
                    'Item removed',
                    setSnackbarSeverity,
                    setSnackbarText
                );
            },
        });
    };

    return (
        <div>
            <ParentItemSelector
                item={item}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleRemoveItem={handleRemoveItem}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSnackbarText={setSnackbarText}
                setSnackbarSeverity={setSnackbarSeverity}
                filteredWpIds={filteredWpIds}
            />
            <ChildItemSelector
                item={item}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleRemoveItem={handleRemoveItem}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSnackbarText={setSnackbarText}
                setSnackbarSeverity={setSnackbarSeverity}
                filteredWpIds={filteredWpIds}
            />
        </div>
    );
};
