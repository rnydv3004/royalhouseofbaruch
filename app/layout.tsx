import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'

// The "Royal" Serif Font
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// The Clean "Modern" Sans Font
const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata = {
  title: 'Royal House of Bharuch',
  description: 'The Official Website of the Royal House',
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}