import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/common/PageTransition';
import PrivateRoute from './components/guards/PrivateRoute';
import ErrorBoundary from './components/guards/ErrorBoundary';

// Lazy load components for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Catalog = lazy(() => import('./pages/admin/Catalog'));
const VillaDetail = lazy(() => import('./pages/VillaDetail'));
const CalendarManager = lazy(() => import('./pages/admin/CalendarManager'));
const Settings = lazy(() => import('./pages/admin/Settings'));
import AdminLayout from './components/layout/AdminLayout';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-cream dark:bg-charcoal flex items-center justify-center">
    <div className="w-12 h-[2px] bg-bronze animate-pulse"></div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Use a stable key for admin routes to prevent full-page transitions when navigating within admin
  const isPageTransitionDisabled = location.pathname.startsWith('/admin');
  const routeKey = isPageTransitionDisabled ? 'admin-section' : location.pathname;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/villas/:id" 
          element={
            <PageTransition>
              <VillaDetail />
            </PageTransition>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="calendar" element={<CalendarManager />} />
          <Route path="settings" element={<Settings />} />
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
