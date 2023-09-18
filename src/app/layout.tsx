
import NavBar from '@/components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../firebase'
//import "bootstrap/dist/js/bootstrap.bundle"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import  '../firebase'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PRUEBA ZURICH',
  description: 'PRUEBA ZURICH',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <div className="p-3 mb-2 bg-dark w-100 p-3"
        style={{height:"700px"}}
        >
        <NavBar/>
        {children}
        </div>
        </body>

      
    </html>
  )
}
