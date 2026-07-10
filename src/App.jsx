import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ThreeLoader from './components/ThreeLoader';
import ProtectedRoute from './components/ProtectedRoute';
const Layout = lazy(() => import('./components/Layout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const TenantLayout = lazy(() => import('./components/tenant/TenantLayout'));
const TenantDashboardHome = lazy(() => import('./pages/tenant/TenantDashboardHome'));
const TenantSearchProperties = lazy(() => import('./pages/tenant/TenantSearchProperties'));
const TenantPropertyDetail = lazy(() => import('./pages/tenant/TenantPropertyDetail'));
const TenantFavourites = lazy(() => import('./pages/tenant/TenantFavourites'));
const TenantMyRentals = lazy(() => import('./pages/tenant/TenantMyRentals'));
const TenantRentalDetails = lazy(() => import('./pages/tenant/TenantRentalDetails'));
const TenantVisits = lazy(() => import('./pages/tenant/TenantVisits'));
const TenantVisitDetail = lazy(() => import('./pages/tenant/TenantVisitDetail'));
const TenantNotifications = lazy(() => import('./pages/tenant/TenantNotifications'));
const TenantSettings = lazy(() => import('./pages/tenant/TenantSettings'));
const TenantPayments = lazy(() => import('./pages/tenant/TenantPayments'));
const TenantPaymentReceipt = lazy(() => import('./pages/tenant/TenantPaymentReceipt'));
const TenantAgreements = lazy(() => import('./pages/tenant/TenantAgreements'));
const TenantAgreementPreview = lazy(() => import('./pages/tenant/TenantAgreementPreview'));
const TenantTickets = lazy(() => import('./pages/tenant/TenantTickets'));
const TenantRaiseTicket = lazy(() => import('./pages/tenant/TenantRaiseTicket'));
const TenantTicketDetail = lazy(() => import('./pages/tenant/TenantTicketDetail'));
const OwnerLayout = lazy(() => import('./components/owner/OwnerLayout'));
const OwnerDashboard = lazy(() => import('./pages/owner/OwnerDashboard'));
const OwnerMyProperties = lazy(() => import('./pages/owner/OwnerProperties'));
const OwnerAddProperty = lazy(() => import('./pages/owner/OwnerAddProperty'));
const OwnerEditProperty = lazy(() => import('./pages/owner/OwnerEditProperty'));
const OwnerPropertyDetail = lazy(() => import('./pages/owner/OwnerPropertyDetail'));
const OwnerTenants = lazy(() => import('./pages/owner/OwnerTenants'));
const OwnerTenantDetail = lazy(() => import('./pages/owner/OwnerTenantDetail'));
const OwnerAgreements = lazy(() => import('./pages/owner/OwnerAgreements'));
const OwnerPayments = lazy(() => import('./pages/owner/OwnerPayments'));
const OwnerPaymentHistory = lazy(() => import('./pages/owner/OwnerPaymentHistory'));
const OwnerPaymentDetail = lazy(() => import('./pages/owner/OwnerPaymentDetail'));
const OwnerVisits = lazy(() => import('./pages/owner/OwnerVisits'));
const OwnerSettings = lazy(() => import('./pages/owner/OwnerSettings'));
const OwnerNotifications = lazy(() => import('./pages/owner/OwnerNotifications'));
const OwnerTickets = lazy(() => import('./pages/owner/OwnerTickets'));
const OwnerTicketDetail = lazy(() => import('./pages/owner/OwnerTicketDetail'));
const SuperAdminDashboard = lazy(() => import('./pages/superadmin/SuperAdminDashboard'));
const SuperAdminLayout = lazy(() => import('./pages/superadmin/SuperAdminLayout'));
const TenantsList = lazy(() => import('./pages/superadmin/TenantsList'));
const TenantDetails = lazy(() => import('./pages/superadmin/TenantDetails'));
const OwnersListsuper = lazy(() => import('./pages/superadmin/OwnersList'));
const OwnerDetailssuper = lazy(() => import('./pages/superadmin/OwnerDetails'));
const PropertiesList = lazy(() => import('./pages/superadmin/PropertiesList'));
const PropertyDetails = lazy(() => import('./pages/superadmin/PropertyDetails'));
const RentalsList = lazy(() => import('./pages/superadmin/RentalsList'));
const RentalDetailsSuper = lazy(() => import('./pages/superadmin/RentalDetails'));
const ServiceRequestsList = lazy(() => import('./pages/superadmin/ServiceRequestsList'));
const ServiceRequestDetails = lazy(() => import('./pages/superadmin/ServiceRequestDetails'));
const OwnersList = lazy(() => import('./pages/superadmin/OwnersList'));
const OwnerDetails = lazy(() => import('./pages/superadmin/OwnerDetails'));


function App() {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <ErrorBoundary>
      {/* initial 3D building construction loader */}

      <BrowserRouter>
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="properties" element={<PropertiesPage />} />
              <Route path="detail" element={<PropertyDetailPage />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Owner Dashboard — standalone layout, no main navbar/footer */}
            <Route
              path="/owner"
              element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OwnerDashboard />} />
              <Route path="properties" element={<OwnerMyProperties />} />
              <Route path="properties/add" element={<OwnerAddProperty />} />
              <Route path="properties/edit/:id" element={<OwnerEditProperty />} />
              <Route path="properties/:id" element={<OwnerPropertyDetail />} />
              <Route path="agreements" element={<OwnerAgreements />} />
              <Route path="tenants" element={<OwnerTenants />} />
              <Route path="tenants/:id" element={<OwnerTenantDetail />} />
              <Route path="payments" element={<OwnerPayments />} />
              <Route path="payments/history" element={<OwnerPaymentHistory />} />
              <Route path="payments/:id" element={<OwnerPaymentDetail />} />
              <Route path="visits" element={<OwnerVisits />} />
              <Route path="settings" element={<OwnerSettings />} />
              <Route path="notifications" element={<OwnerNotifications />} />
              <Route path="tickets" element={<OwnerTickets />} />
              <Route path="tickets/:id" element={<OwnerTicketDetail />} />
            </Route>

            {/* Standalone Auth Route */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Superadmin Routes */}
            <Route path="/superadmin" element={<SuperAdminLayout />}>
              <Route index element={<SuperAdminDashboard />} />
              <Route path="tenants" element={<TenantsList />} />
              <Route path="tenants/:id" element={<TenantDetails />} />
              <Route path="owners" element={<OwnersListsuper />} />
              <Route path="owners/:id" element={<OwnerDetailssuper />} />
              <Route path="properties" element={<PropertiesList />} />
              <Route path="properties/:id" element={<PropertyDetails />} />
              <Route path="requests" element={<ServiceRequestsList />} />
              <Route path="requests/:id" element={<ServiceRequestDetails />} />
              <Route path="rentals" element={<RentalsList />} />
              <Route path="rentals/:id" element={<RentalDetailsSuper />} />
            </Route>

            {/* Tenant Dashboard Route Group */}
            <Route
              path="/tenant"
              element={
                <ProtectedRoute allowedRoles={['tenant']}>
                  <TenantLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TenantDashboardHome />} />
              <Route path="search" element={<TenantSearchProperties />} />
              <Route path="property/:id" element={<TenantPropertyDetail />} />
              {/* Add placeholders for other tenant routes here if needed in the future */}
              <Route path="rentals" element={<TenantMyRentals />} />
              <Route path="rentals/:id" element={<TenantRentalDetails />} />
              <Route path="visits" element={<TenantVisits />} />
              <Route path="visits/:id" element={<TenantVisitDetail />} />
              <Route path="payments" element={<TenantPayments />} />
              <Route path="payments/receipt/:id" element={<TenantPaymentReceipt />} />
              <Route path="agreements" element={<TenantAgreements />} />
              <Route path="agreements/:id" element={<TenantAgreementPreview />} />
              <Route path="favourites" element={<TenantFavourites />} />
              <Route path="notifications" element={<TenantNotifications />} />
              <Route path="settings" element={<TenantSettings />} />
              <Route path="tickets">
                <Route index element={<TenantTickets />} />
                <Route path="new" element={<TenantRaiseTicket />} />
                <Route path=":id" element={<TenantTicketDetail />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>

      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
