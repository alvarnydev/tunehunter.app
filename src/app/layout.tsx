import Footer from './components/Footer';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'A place to find your music',
  description:
    'We compare music vendors like Beatport and Amazon Music to find the best deal for you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden'>
          <main className='flex-1 flex flex-col justify-evenly items-center w-full max-w-5xl md:gap-4 gap-10 py-10'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
