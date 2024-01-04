import { useParams } from 'react-router'
import TabComponent from '../../../components/Tabs/Tabs'
import { useGetListById } from '../../../services/hooks/List/useGetListById'
import { AddMoreCompact } from './AddMore'
import { PhoneList } from './List/PhoneList'

const Index = () => {
    const { listId } = useParams()
    const { data: list, isFetching } = useGetListById(listId!)

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
    )
}

export default Index
