import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Provider } from './provider';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

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
            <body className={poppins.className}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
};

export { metadata };
export default RootLayout;