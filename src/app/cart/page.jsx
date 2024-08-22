import React from 'react'
import StoreProvider from '../StoreProvider'
import Cart from './Cart'
import AuthProvider from '@/context/AuthProvider'

const page = () => {
  return (
    <StoreProvider>
      <AuthProvider>

      <Cart/>
      </AuthProvider>
    </StoreProvider>
  )
}

export default page
