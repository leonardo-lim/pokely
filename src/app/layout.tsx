import type { Metadata } from 'next';
import { Provider } from './provider';
import './globals.css';

const metadata: Metadata = {
    title: 'Pokely',
    description: 'Pokémon Explorer Web App with Next.js and TypeScript'
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
};

export { metadata };
export default RootLayout;