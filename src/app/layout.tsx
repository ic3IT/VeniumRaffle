import './raffle-globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import logo from './social-media-icons/scrolliumlogo.png'

// Define the custom font
const inter = Inter({ subsets: ['latin'] })

// Set the metadata for the page
// Set the metadata for the page
export const metadata: Metadata = {
  title: 'Venium: Raffle',
  description: 'Venium: Raffle - Dive in and experience the excitement of our raffle event!',
  icons: {
    icon: './social-media-icons/scrolliumlogo.png', // Corrected here
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Ensure title is a string and not null/undefined */}
        <title>Venium</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Venium: Innovative Community Ecosystem on Scroll zkEVM" />
        
        <meta property="og:title" content="Venium: Innovative Community Ecosystem on Scroll zkEVM" />
        <meta property="og:description" content="Venium: Innovative Community Ecosystem on Scroll zkEVM - Dive in and experience innovation at its finest." />
        <meta property="og:image" content="https://i.imgur.com/grPbAkO.png" />
        <meta property="og:url" content="https://venium.io" />

        <meta name="twitter:card" content="summary_large_image "/>
        <meta name="twitter:title" content="Venium: Innovative Community Ecosystem on Scroll zkEVM"/>
        <meta name="twitter:description" content="Venium: Innovative Community Ecosystem on Scroll zkEVM - Dive in and experience innovation at its finest."/>
        <meta name="twitter:image" content="https://i.imgur.com/grPbAkO.png"/>

        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
