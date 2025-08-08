'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

interface ProviderProps {
    children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <ChakraProvider value={defaultSystem}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </ChakraProvider>
    );
};

export { Provider };