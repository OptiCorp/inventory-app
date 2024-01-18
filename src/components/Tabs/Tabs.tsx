import { Tab } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useGetListById } from '../../services/hooks/list/useGetListById';
import {
    StyledIndicator,
    StyledNumberofItems,
    StyledTabButton,
    StyledTabContainer,
    StyledTitle,
} from './styles';

interface Tab {
    title: string;
    render: () => JSX.Element;
}

interface TabBarProps {
    tabs: Tab[];
}
export default function TabComponent({ tabs }: TabBarProps) {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { listId } = useParams();
    const { data: list, isFetching } = useGetListById(listId!);
    return (
        <>
            <StyledTabContainer>
                {tabs.map((tab, index) => (
                    <StyledTabButton
                        key={index}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        <StyledTitle active={activeTab === index}>{tab.title}</StyledTitle>
                        <StyledIndicator active={activeTab === index} />{' '}
                        {tab.title === 'List' && (
                            <StyledNumberofItems active={activeTab === index}>
                                {`[${list?.items?.length}]`}
                            </StyledNumberofItems>
                        )}
                    </StyledTabButton>
                ))}
            </StyledTabContainer>
            {tabs[activeTab].render()}
        </>
    );
}
