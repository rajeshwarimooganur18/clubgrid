import { Navigate } from 'react-router-dom';
import { useVerifiedSession } from './useVerifiedSession';

function SessionGate({ children, unauthenticated, redirectAuthenticated = false }) {
  const { status, user, retry } = useVerifiedSession();

  if (status === 'checking') {
    return <p role="status">Checking your session...</p>;
  }
  if (status === 'error') {
    return (
      <div role="alert">
        <p>Unable to verify your session. Please try again.</p>
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  }
  if (status === 'unauthenticated') {
    return unauthenticated;
  }
  if (redirectAuthenticated) {
    return <Navigate to={user.role === 'super_admin' ? '/admin' : '/'} replace />;
  }

  return children;
}

export default SessionGate;
