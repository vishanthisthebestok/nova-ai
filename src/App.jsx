import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import PageNotFound from './lib/PageNotFound';
import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from '@/components/ProtectedRoute';
import AppLayout from '@/components/chat/AppLayout';
import Landing from '@/pages/Landing';
import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
import Prompts from '@/pages/Prompts';
import Memory from '@/pages/Memory';
import SettingsPage from '@/pages/Settings';
import SearchPage from '@/pages/SearchPage';
import Projects from '@/pages/Projects';
import Files from '@/pages/Files';
import Extensions from '@/pages/Extensions';
import Download from '@/pages/Download';
import Studio from '@/pages/Studio';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Home />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/files" element={<Files />} />
          <Route path="/extensions" element={<Extensions />} />
          <Route path="/download" element={<Download />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App