import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import Favorites from './pages/Favorites.jsx';
import Compare from './pages/Compare.jsx';
import EmiCalculatorPage from './pages/EmiCalculatorPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Careers from './pages/Careers.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';
import Legal from './pages/Legal.jsx';

import Profile from './pages/Profile.jsx';
import ProfileOverview from './pages/profile/ProfileOverview.jsx';
import ProfileFavoritesTab from './pages/profile/ProfileFavoritesTab.jsx';
import ProfileSettings from './pages/profile/ProfileSettings.jsx';

import Admin from './pages/Admin.jsx';
import AdminOverview from './pages/admin/AdminOverview.jsx';

import AdminUsers from './pages/admin/AdminUsers.jsx';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Nested protected routes: /profile, /profile/favorites, /profile/settings */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfileOverview />} />
              <Route path="favorites" element={<ProfileFavoritesTab />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            {/* Nested admin-only routes: /admin, /admin/properties, /admin/users */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOverview />} />
           
              <Route path="users" element={<AdminUsers />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
