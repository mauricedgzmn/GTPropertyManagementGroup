import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Invest from './pages/Invest'
import WhySTR from './pages/WhySTR'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import PropertyForm from './pages/admin/PropertyForm'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import ConfirmBooking from './pages/ConfirmBooking'
import InquiryPage from './pages/InquiryPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<AboutUs />} />
        <Route path="/work-with-us" element={<Invest />} />
        <Route path="/why-str" element={<WhySTR />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/properties/new" element={<PropertyForm />} />
        <Route path="/admin/properties/edit/:id" element={<PropertyForm />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/booking/:id" element={<ConfirmBooking />} />
        <Route path="/inquiry/:id" element={<InquiryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
