import { useAuth } from '@/lib/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, unauthenticatedElement }) {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return unauthenticatedElement || <Navigate to="/login" replace />;
  }

  return children;
}
