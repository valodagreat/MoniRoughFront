import { useEffect, useRef, useCallback } from 'react';

const LogoutTimer = ({ logout }) => {
  const timerRef = useRef(null);

  const handleResetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, 2 * 60 * 1000); // 2 minutes (2 * 60 * 1000 milliseconds)
  }, [logout]);

  const resetTimer = useCallback(() => {
    handleResetTimer();
  }, [handleResetTimer]);

  useEffect(() => {
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('scroll', resetTimer);

    handleResetTimer();

    return () => {
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      document.removeEventListener('scroll', resetTimer);
      clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  return null;
};

export default LogoutTimer;
