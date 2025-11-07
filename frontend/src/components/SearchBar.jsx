import React, { useState } from 'react';


export default function SearchBar({ onSearch }) {
const [q, setQ] = useState('');
return (
<form onSubmit={(e) => { e.preventDefault(); onSearch(q); }} className="flex gap-2">
<input value={q} onChange={e => setQ(e.target.value)} placeholder="Search snippets..." className="flex-1 p-2 border rounded" />
<button className="px-3 py-2 bg-slate-200 rounded">Search</button>
</form>
);
}