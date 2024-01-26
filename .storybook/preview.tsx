import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GlobalStyles } from '../src/style/GlobalStyles';

const queryClient = new QueryClient();

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GlobalStyles width={window.innerWidth} />
                    <Story />
                </MemoryRouter>
            </QueryClientProvider>
        ),
    ],
};

export default preview;
