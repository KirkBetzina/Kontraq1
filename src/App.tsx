import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PaymentsPage from './pages/PaymentsPage';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { AppProvider } from './contexts/AppContext';
import { JobProvider } from './contexts/JobContext';
import ContractorPage from './pages/ContractorPage';
import SubcontractorPage from './pages/SubcontractorPage';
import AdminPage from './pages/AdminPage';
import DocumentVerificationPage from './pages/DocumentVerificationPage';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppProvider>
          <JobProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/contractor" element={<ContractorPage />} />
                <Route path="/subcontractor" element={<SubcontractorPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/document-verification" element={<DocumentVerificationPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </JobProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;