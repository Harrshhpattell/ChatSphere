// import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
        {/* <Navbar /> */}
        <div>
        <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout