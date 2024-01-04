import { Tab } from '@mui/material'
import { useState } from 'react'
import { Indicator, TabButton, TabContainer, Title } from './styles'

type StyledProps = {
    active: string
}

interface Tab {
    title: string
    render: () => JSX.Element
}

interface TabBarProps {
    tabs: Tab[]
}
export default function TabComponent({ tabs }: TabBarProps) {
    const [activeTab, setActiveTab] = useState<number>(0)

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
                        <Indicator active={activeTab === index} />
                    </TabButton>
                ))}
            </TabContainer>
            {tabs[activeTab].render()}
        </>
    )
}
