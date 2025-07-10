import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero.tsx";
import Partners from "./components/Partners.tsx";
import ThreePromises from "./components/ThreePromises.tsx";

import ContactPage from './pages/ContactPage.tsx';
import AboutPage from './pages/AboutPage.tsx';


import Footer from "./components/Footer.tsx";
import Registration from "./components/Registration.tsx";
import Navbar from "./components/Navbar.tsx";
import CourseSalesPage from './pages/CourseSalesPage';

const App = () => {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Partners />
              <ThreePromises />
              <CourseSalesPage />
              <Registration />


            </>
          } />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
