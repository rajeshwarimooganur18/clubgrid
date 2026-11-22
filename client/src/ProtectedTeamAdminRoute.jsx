
import { Navigate } from 'react-router-dom';
import { useVerifiedSession } from './useVerifiedSession';

function ProtectedTeamAdminRoute({ children }) {
  const { status, user, retry } = useVerifiedSession();

  if (status === 'checking') {
    return <p>Checking team admin access...</p>;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  if (status === 'error') {
    return (
      <div role="alert">
        <p>Unable to verify team admin access. Please try again.</p>
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  }

  if (status === 'authenticated' && user.role !== 'team_admin') {
    return <Navigate to="/" replace />;
  }

  return status === 'authenticated' && user.role === 'team_admin'
    ? children
    : null;
}

export default ProtectedTeamAdminRoute;
