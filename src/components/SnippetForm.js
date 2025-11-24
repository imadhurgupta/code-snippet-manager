import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LANGUAGES = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 
  'TypeScript', 'Swift', 'Kotlin', 'Rust', 'HTML', 'CSS', 'SQL', 'Bash'
];

const SnippetForm = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'JavaScript',
    code: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchSnippet();
    }
  }, [id]);

  const fetchSnippet = async () => {
    try {
      const docRef = doc(db, "snippets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          title: data.title,
          description: data.description,
          language: data.language,
          code: data.code,
          tags: data.tags.join(', ')
        });
      }
    } catch (error) {
      console.error("Error fetching snippet:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const snippetData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        userId: user.uid,
        updatedAt: new Date()
      };

      if (isEdit) {
        await updateDoc(doc(db, "snippets", id), snippetData);
      } else {
        snippetData.createdAt = new Date();
        await addDoc(collection(db, "snippets"), snippetData);
      }
      
      navigate('/');
    } catch (error) {
      console.error("Error saving snippet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        {isEdit ? 'Edit Snippet' : 'Create New Snippet'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-dark-card rounded-lg shadow-xl p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Language *</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
            required
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., react, hooks, api"
            className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Code *</label>
          <textarea
            name="code"
            value={formData.code}
            onChange={handleChange}
            rows="15"
            className="w-full px-4 py-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm text-black"
            required
            placeholder={`// Your code here...`}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-blue-600 px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Snippet' : 'Create Snippet')}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;