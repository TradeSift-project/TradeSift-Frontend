import { Routes, Route } from 'react-router-dom'


import Login from '../layouts/auth/Login'
import Signup from '../layouts/auth/Signup'
import OTP from '../layouts/auth/OTP'
import Dashboard from '../layouts/Dashboard/Dashboard'
import TradeShield from '../layouts/Dashboard/TradeShield'
import TradeShieldFiling from '../layouts/Dashboard/TradeShieldFiling'
import ResetPassword from '../layouts/auth/ResetPassword'
import Home from '../layouts/Landing/Home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<OTP />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/tradeshield" element={<TradeShield />} />
      <Route path="/dashboard/tradeshield/:filingId" element={<TradeShieldFiling />} />
    </Routes>
  )
}

export default AppRoutes
