import AuthProvider from '@/context/AuthProvider'
import StoreProvider from '../StoreProvider'
import Cart from './Cart'

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
