import { useParams } from 'react-router';
import TabComponent from '../../../components/Tabs/Tabs';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import { AddMoreCompact } from './AddMore';
import { PhoneList } from './list/PhoneList';

const Tabs = () => {
    const { listId } = useParams();
    const { data: list, isFetching } = useGetListById(listId!);

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

export default Tabs;
