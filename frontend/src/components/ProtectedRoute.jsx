import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // ודא שהנתיב ל-firebase נכון אצלך

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // בזמן ש-Firebase טוען את מצב ההתחברות, נציג טעינה קצרה כדי שלא יקפוץ בטעות לדף ה-404/התחברות
  if (loading) {
    return <div className="text-center mt-5 text-white">טוען...</div>;
  }

  // אם אין משתמש מחובר, נזרוק אותו חזרה לעמוד ההתחברות או הרשמה
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // אם יש משתמש מחובר, ניתן לו להיכנס לדף המבוקש
  return children;
};
