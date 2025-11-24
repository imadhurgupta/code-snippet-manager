import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // 1. Wrap fetchSnippet in useCallback
  const fetchSnippet = useCallback(async () => {
    try {
      const docRef = doc(db, "snippets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSnippet({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error fetching snippet:", error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]); // Dependencies needed inside the function

  // 2. Add fetchSnippet to dependency array
  useEffect(() => {
    fetchSnippet();
  }, [fetchSnippet]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await deleteDoc(doc(db, "snippets", id));
        navigate('/');
      } catch (error) {
        console.error("Error deleting snippet:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-blue-400 text-xl">Loading snippet...</div>
      </div>
    );
  }

  if (!snippet) {
    return <div className="text-center py-20 text-gray-400">Snippet not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-dark-card rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{snippet.title}</h1>
              <p className="text-gray-400">{snippet.description}</p>
            </div>
            <span className="bg-blue-600 text-sm px-3 py-1 rounded-lg">
              {snippet.language}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {snippet.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-slate-700 text-gray-300 text-sm px-3 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-200"
            >
              {copied ? '✓ Copied!' : '📋 Copy Code'}
            </button>
            
            <button
              onClick={() => navigate(`/edit/${snippet.id}`)}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition duration-200"
            >
              ✏️ Edit
            </button>
            
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-200"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="p-6">
          <SyntaxHighlighter
            language={snippet.language.toLowerCase()}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        <div className="p-6 border-t border-slate-700 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Created: {new Date(snippet.createdAt?.toDate()).toLocaleString()}</span>
            <span>Updated: {new Date(snippet.updatedAt?.toDate()).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetail;