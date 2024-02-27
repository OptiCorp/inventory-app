import { useParams } from 'react-router';
import { TabComponent } from '../../../components/Tabs/Tabs';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import { AddMoreCompact } from './AddMore';
import { PhoneList } from './list/PhoneList';

export const Tabs = () => {
    const { listId } = useParams();
    const { data: list } = useGetListById(listId!);

    return (
        <>
            <TabComponent
                tabs={[
                    {
                        title: `List`,
                        render: () => <PhoneList list={list!} />,
                    },
                    {
                        title: 'Add more',
                        render: () => <AddMoreCompact />,
                    },
                ]}
            />
        </>
    );
};
