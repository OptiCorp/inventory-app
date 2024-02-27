import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SearchBar } from '../../../src/components/SearchBar/SearchBar';

describe('SearchBar Component', () => {
    it('renders the SearchBar component with the correct placeholder', () => {
        const placeholderText = 'Search products';
        render(
            <SearchBar searchTerm="product" placeholder={placeholderText} setSearchTerm={vi.fn()} />
        );

        const searchBarInput = screen.getByPlaceholderText(placeholderText);

        expect(searchBarInput).toBeInTheDocument();
        expect(searchBarInput).toHaveAttribute('placeholder', placeholderText);
    });
    it('updates the searchTerm when a user types into the SearchBar', () => {
        const setSearchTerm = vi.fn();
        render(<SearchBar searchTerm="" placeholder="Search" setSearchTerm={setSearchTerm} />);

        const searchTermInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchTermInput, { target: { value: 'new search term' } });

        expect(setSearchTerm).toHaveBeenCalledWith('new search term');
    });
});
