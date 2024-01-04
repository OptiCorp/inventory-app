import { useState } from 'react'
import TabComponent from '../../../components/Tabs/Tabs'
import { PhoneList } from './List/PhoneList'
import { AddMoreCompact } from './AddMore'

const Index = () => {
    const [activeTab, setActiveTab] = useState<number>(0)

    return (
        <>
            <TabComponent
                tabs={[
                    {
                        title: 'List',
                        render: () => <PhoneList />,
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
