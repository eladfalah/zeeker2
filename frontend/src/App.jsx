// App.jsx

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Zeekerx } from './components/Zeekerx';
import { Logine_page } from './components/Logine_page';
import { Home_page } from './components/Home_page';
import { Upload_documents_page } from './components/Upload_documents_page';
import { Coupons_display_page } from './components/Coupons_display_page';
import { Register_page } from './components/Register_page';
import { Massages_page } from './components/Massages_page';
import { Contact_page } from './components/Contact_page';
import { ProtectedRoute } from './components/ProtectedRoute'; 
import { Service_history } from './components/Service_history';
import { Services_page } from './components/vehicles/Service_Page';
import { Service_details } from './components/vehicles/Service_details';
import { Locations_section } from './components/map/Locations_section';
import { PaymentPage1 } from './components/PaymentPage1';
import { PaymentPage2 } from './components/PaymentPage2';
import { PaymentPage3 } from './components/PaymentPage3';

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Logine_page />} />
          <Route path="/PaymentPage1" element={<PaymentPage1 />} />
          <Route path="/PaymentPage2" element={<PaymentPage2 />} />
          <Route path="/PaymentPage3" element={<PaymentPage3 />} />
          <Route path="/register_page" element={<Register_page />} />
          <Route path="/login" element={<Logine_page />} />
          <Route path="/zeekerx" element={<Zeekerx />} />
          <Route path="/home_page" element={<Home_page />} />
          <Route path="/home" element={<Home_page />} />
          <Route path="/coupons_display_page" element={<Coupons_display_page />} />
          <Route path="/services" element={<Services_page />} />
          <Route path="/service" element={<Service_details />} />
          <Route path="/location" element={<Locations_section />} />
          <Route path="/history" element={<Service_history />} />
          <Route path="/Massages_page" element={<Massages_page />} />
          <Route path="/contact_page" element={<Contact_page />} />
          <Route 
            path="/Upload_documents_page" 
            element={
              <ProtectedRoute>
                <Upload_documents_page />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
