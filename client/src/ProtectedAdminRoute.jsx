import { Navigate } from 'react-router-dom';
import { useVerifiedSession } from './useVerifiedSession';

function ProtectedAdminRoute({ children }) {
  const { status, user, retry } = useVerifiedSession();

  if (status === 'checking') {
    return <p>Checking admin access...</p>;
  }
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  if (status === 'authenticated' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  if (status === 'error') {
    return (
      <div role="alert">
        <p>Unable to verify admin access. Please try again.</p>
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  }

  return status === 'authenticated' && user.role === 'admin' ? children : null;
}

export default ProtectedAdminRoute;
