import React, { useState, useEffect, useCallback } from 'react'; // 1. Import useCallback
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import SnippetCard from './SnippetCard';

const Dashboard = ({ user }) => {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // 2. Wrap the function in useCallback so it is stable
  const fetchSnippets = useCallback(async () => {
    if (!user) return; // Safety check

    try {
      const q = query(
        collection(db, "snippets"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const snippetsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSnippets(snippetsData);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    } finally {
      setLoading(false);
    }
  }, [user]); // Re-create this function only if 'user' changes

  // 3. Add fetchSnippets to the dependency array
  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await deleteDoc(doc(db, "snippets", id));
        setSnippets(snippets.filter(snippet => snippet.id !== id));
      } catch (error) {
        console.error("Error deleting snippet:", error);
      }
    }
  };

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = !languageFilter || snippet.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  const languages = [...new Set(snippets.map(s => s.language))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-blue-400 text-xl">Loading snippets...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Code Snippets</h1>
        <p className="text-gray-400">Manage and organize your code snippets</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Snippets...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
        />
        
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {filteredSnippets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">{snippets.length === 0 ? '📝' : '🔍'}</div>
          <h3 className="text-2xl font-semibold mb-2">
            {snippets.length === 0 ? 'No snippets yet' : 'No snippets found'}
          </h3>
          <p className="text-gray-400 mb-6">
            {snippets.length === 0 
              ? 'Create your first code snippet to get started' 
              : 'Try adjusting your search or filter'}
          </p>
          {snippets.length === 0 && (
            <Link 
              to="/create" 
              className="bg-primary hover:bg-blue-600 px-6 py-3 rounded-lg inline-block transition duration-200"
            >
              Create Snippet
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map(snippet => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;