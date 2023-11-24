import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SearchResultCard from "../../components/searchResultCard/SearchResultCard";
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact";
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { DropdownButton, CenterDiv } from "./styles"

type Props = {
    items: any
    title: string
}

const Dropdown = ({ items, title }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(10);
    const { width } = useWindowDimensions()

    const handleScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return
        }
        setShowMore(previous => previous + 10)
    };

    useEffect(() => {
        window.addEventListener(`scroll`, handleScroll)
        return () => { window.removeEventListener(`scroll`, handleScroll) }
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    if (items.length == 0) {
        return
    }

    return (
        <div className="dropdown">
            <DropdownButton onClick={toggleDropdown}>{title} ({items.length}) {isOpen ? <SlArrowUp></SlArrowUp> : <SlArrowDown></SlArrowDown>} </DropdownButton>
            {isOpen && (
                <div className="dropdown-content">
                    {items.slice(0, showMore)?.map((part: any) => (
                        <Link style={{ textDecoration: 'none', color: 'black', }} to={`/${part.wpId}`} key={part.wpId} >{width > 800 ? <SearchResultCard part={part} /> : <SearchResultCardCompact part={part} />}</Link>
                    ))}
                    {items.length > 10 ?
                        <CenterDiv>
                            <DropdownButton onClick={() => setShowMore(showMore + 10)}>Show more</DropdownButton>
                        </CenterDiv>
                        : <></>
                    }
                </div>
            )}
        </div>
    );
};



export default Dropdown;
