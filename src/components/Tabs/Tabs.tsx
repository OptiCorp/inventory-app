import { Tab } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useGetListById } from '../../services/hooks/List/useGetListById'
import {
    Indicator,
    NumberofItems,
    TabButton,
    TabContainer,
    Title,
} from './styles'

interface Tab {
    title: string
    render: () => JSX.Element
}

interface TabBarProps {
    tabs: Tab[]
}
export default function TabComponent({ tabs }: TabBarProps) {
    const [activeTab, setActiveTab] = useState<number>(0)
    const { listId } = useParams()

    const { data: list, isFetching } = useGetListById(listId!)
    return (
        <>
            <TabContainer>
                {tabs.map((tab, index) => (
                    <TabButton
                        key={index}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        <Title active={activeTab === index}>{tab.title}</Title>
                        <Indicator active={activeTab === index} />{' '}
                        {tab.title === 'List' ? (
                            <NumberofItems active={activeTab === index}>
                                {`[${list?.items?.length}]`}
                            </NumberofItems>
                        ) : null}
                    </TabButton>
                ))}
            </TabContainer>
            {tabs[activeTab].render()}
        </>
    )
}
