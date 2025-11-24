import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import SnippetForm from './components/SnippetForm';
import SnippetDetail from './components/SnippetDetail';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-blue-400 text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <Header user={user} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/auth" 
              element={!user ? <Auth /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/create" 
              element={user ? <SnippetForm user={user} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/edit/:id" 
              element={user ? <SnippetForm user={user} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/snippet/:id" 
              element={user ? <SnippetDetail user={user} /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;