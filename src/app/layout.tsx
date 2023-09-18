import React from 'react'
import NavBar from '@/components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import '../firebase'
import FooterComponent from '@/components/FooterComponent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PRUEBA ZURICH',
  description: 'PRUEBA ZURICH'
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-3 w-100 p-3 bg-dark" style={{ height: '700px' }}>
          <NavBar />
          {children}
        </div>
        <FooterComponent />
      </body>
    </html>
  )
}

export default RootLayout
