import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-dark-card shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            <span className="text-blue-400">{`</>`}</span> CodeSnippets
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link 
                to="/create" 
                className="bg-primary hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200"
              >
                + New Snippet
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;