import React, { useEffect, useState } from 'react';
import { fetchSnippets, createSnippet, updateSnippet, deleteSnippet } from './api';
import Home from './pages/Home';
import SnippetEditor from './pages/SnippetEditor';


export default function App() {
const [snippets, setSnippets] = useState([]);
const [query, setQuery] = useState('');
const [editing, setEditing] = useState(null);


async function load(q) {
const data = await fetchSnippets(q);
setSnippets(data);
}


useEffect(() => { load(); }, []);


const handleCreate = async (payload) => {
const saved = await createSnippet(payload);
setSnippets(prev => [saved, ...prev]);
};


const handleUpdate = async (id, payload) => {
const updated = await updateSnippet(id, payload);
setSnippets(prev => prev.map(s => s._id === id ? updated : s));
setEditing(null);
};


const handleDelete = async (id) => {
await deleteSnippet(id);
setSnippets(prev => prev.filter(s => s._id !== id));
};


const handleSearch = async (q) => {
setQuery(q);
await load(q);
};


return (
<div className="min-h-screen p-6">
<div className="max-w-5xl mx-auto">
<h1 className="text-3xl font-bold mb-4">Code Snippet Manager</h1>
<Home
snippets={snippets}
onCreate={handleCreate}
onEdit={(s) => setEditing(s)}
onDelete={handleDelete}
onSearch={handleSearch}
/>


{editing && (
<SnippetEditor
snippet={editing}
onCancel={() => setEditing(null)}
onSave={(payload) => handleUpdate(editing._id, payload)}
/>
)}
</div>
</div>
);
}