import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authAPI, getCurrentUser, getToken, logout, setCurrentUser } from './api';

export function useVerifiedSession() {
  const location = useLocation();
  const pathname = location.pathname;
  const token = getToken();
  const storedUser = getCurrentUser();
  const hasStoredSession = Boolean(
    typeof token === 'string' &&
    token.trim() &&
    storedUser &&
    typeof storedUser === 'object' &&
    !Array.isArray(storedUser)
  );
  const [session, setSession] = useState({
    pathname: null,
    status: 'checking',
    user: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const currentToken = getToken();
    const currentUser = getCurrentUser();

    if (!currentToken || !currentToken.trim() || !currentUser ||
        typeof currentUser !== 'object' || Array.isArray(currentUser)) {
      if (currentToken || currentUser) logout();
      return () => {
        active = false;
      };
    }

    authAPI.getProfile()
      .then(({ student }) => {
        if (!active) return;
        if (!student || typeof student !== 'object' || !student.role) {
          setSession({ pathname, status: 'error', user: null });
          return;
        }

        const verifiedUser = { ...currentUser, ...student, loggedIn: true };
        setCurrentUser(verifiedUser);
        setSession({ pathname, status: 'authenticated', user: verifiedUser });
      })
      .catch((error) => {
        if (!active) return;
        if (error.status === 401) {
          logout();
          setSession({ pathname, status: 'unauthenticated', user: null });
          return;
        }
        setSession({ pathname, status: 'error', user: null });
      });

    return () => {
      active = false;
    };
  }, [attempt, pathname]);

  const retry = useCallback(() => {
    setSession((current) => ({ ...current, status: 'checking' }));
    setAttempt((current) => current + 1);
  }, []);

  const isCurrentPathVerified = session.pathname === pathname;
  return {
    status: !hasStoredSession
      ? 'unauthenticated'
      : isCurrentPathVerified
        ? session.status
        : 'checking',
    user: hasStoredSession && isCurrentPathVerified ? session.user : null,
    retry,
  };
}
