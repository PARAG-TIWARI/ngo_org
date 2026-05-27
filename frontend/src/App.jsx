import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Certifications from './pages/Certifications';
import Programs from './pages/Programs';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import AnnualReport from './pages/AnnualReport';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminGallery from './admin/AdminGallery';
import AdminActivities from './admin/AdminActivities';
import AdminVolunteers from './admin/AdminVolunteers';
import AdminContacts from './admin/AdminContacts';
import AdminMembers from './admin/AdminMembers';
import AdminCertificates from './admin/AdminCertificates';
import AdminDonations from './admin/AdminDonations';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function AdminWrapper() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<Members />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/annual-report" element={<AnnualReport />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminWrapper />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="activities" element={<AdminActivities />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="donations" element={<AdminDonations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
