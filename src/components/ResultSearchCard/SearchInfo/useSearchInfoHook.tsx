// import { useContext, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import UmAppContext from '../../../contexts/UmAppContext';
// import { Item, MutateItemList } from '../../../services/apiTypes';
// import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
// import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
// import { useGetListById } from '../../../services/hooks/list/useGetListById';
// import { useAddVendor } from '../../../services/hooks/vendor/useAddVendor';

// type Props = {
//     part: Item;
//     icon?: string;
// };

// export const SearchInfoHook = ({ part, icon }: Props) => {
//     const { mutate } = useAddVendor();
//     const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);
//     const [alreadyAdded, setAlreadyAdded] = useState(false);
//     const [open, setOpen] = useState(false);
//     const { listId } = useParams();
//     const navigate = useNavigate();
//     const { data: list } = useGetListById(listId!);
//     const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList();
//     const {
//         mutate: mutateRemoveItemFromList,
//         isSuccess: removeItemSuccess,
//         data: removeData,
//     } = useRemoveItemsFromList();

//     const handleAdd = (e: React.MouseEvent, ids: MutateItemList) => {
//         e.stopPropagation();
//         const alreadyAdded = list?.items.some((item) => item.id === part.id);
//         if (alreadyAdded) {
//             {
//                 setAlreadyAdded(true);
//             }
//             setSnackbarSeverity('error');
//             setSnackbarText('already in list');
//         }
//         mutateAddItemToList(ids, {
//             onSuccess: (data) => {
//                 if (alreadyAdded) return;
//                 setSnackbarText(`${part.wpId} was added`);

//                 if (data.status >= 400) {
//                     setSnackbarSeverity('error');
//                     setSnackbarText(`${data.statusText}, please try again.`);
//                 }
//             },
//         });
//         handleClose(e);
//     };
//     const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
//         e.stopPropagation();
//         mutateRemoveItemFromList(ids, {
//             onSuccess: (removeData) => {
//                 setSnackbarText(`${part.wpId} was removed`);

//                 if (removeData.status >= 400) {
//                     setSnackbarSeverity('error');
//                     setSnackbarText(`${removeData.statusText}, please try again.`);
//                 }
//             },
//         });
//         handleClose(e);
//     };
//     const handleClickOpen = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setOpen(true);
//     };
//     const handleClose = (e: React.MouseEvent) => {
//         e.stopPropagation();

//         setOpen(false);
//     };

//     return {
//         handleAdd,
//         handleDelete,
//         handleClickOpen,
//         handleClose,
//     };
// };
