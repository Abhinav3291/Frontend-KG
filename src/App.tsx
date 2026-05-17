import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Hero from "./components/Hero.tsx";
import Partners from "./components/Partners.tsx";
import ContactPage from './pages/ContactPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import Footer from "./components/Footer.tsx";
import Registration from "./components/Registration.tsx";
import Navbar from "./components/Navbar.tsx";
import CourseSalesPage from './pages/CourseSalesPage';
import WhyKgPage from './pages/WhyKgPage.tsx';
import VerifyCertificate from './pages/VerifyCertificate.tsx';

// Admin Imports
import AdminLogin from './Admin/pages/AdminLogin.tsx';
import AdminLayout from './Admin/pages/AdminLayout.tsx';
import AdminCertificates from './Admin/pages/AdminCertificates.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="font-sans min-h-screen">
        <Routes>
          {/* Main Website Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={
              <>
                <Hero />
                <Partners />
                <CourseSalesPage />
                <Registration />
              </>
            } />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-kg" element={<WhyKgPage />} />
          </Route>

          {/* Standalone Pages */}
          <Route path="/verify/:id" element={<VerifyCertificate />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminCertificates />} />
            <Route path="certificates" element={<AdminCertificates />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
