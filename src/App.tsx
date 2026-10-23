import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { WorkspaceLayout } from './components/layout/WorkspaceLayout';
import { DashboardPage } from './pages/DashboardPage';
import { FCEWizardPage } from './pages/FCEWizardPage';
import { QuotePackagesPage } from './pages/QuotePackagesPage';
import { CataloguePage } from './pages/CataloguePage';
import { ReportsPage } from './pages/ReportsPage';
import { InventoryPage } from './pages/InventoryPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { BillingPage } from './pages/BillingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AssessmentHistoryPage } from './pages/AssessmentHistoryPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { hasInitialLoaded, setHasInitialLoaded } = useApp();

  return (
    <>
      {!hasInitialLoaded && (
        <InitialLoadingScreen onComplete={() => setHasInitialLoaded(true)} />
      )}

      <BrowserRouter>
        <Routes>
          {/* Public Marketing Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/forgot-password" element={<LoginPage />} />

          {/* Authenticated Rehabilitation Workspace */}
          <Route path="/app" element={<WorkspaceLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="assessments" element={<AssessmentHistoryPage />} />
            <Route path="assessments/new" element={<FCEWizardPage />} />
            <Route path="assessments/:id" element={<QuotePackagesPage />} />
            <Route path="assessments/:id/quotes" element={<QuotePackagesPage />} />
            <Route path="quotes" element={<QuotePackagesPage />} />
            <Route path="quotes/:id" element={<QuotePackagesPage />} />
            <Route path="catalogue" element={<CataloguePage />} />
            <Route path="catalogue/:id" element={<CataloguePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="reports/:id" element={<ReportsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="workspace" element={<WorkspacePage />} />
            <Route path="workspace/team" element={<WorkspacePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
