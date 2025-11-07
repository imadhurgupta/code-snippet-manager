import React from 'react';
import SnippetCard from '../components/SnippetCard';
import SnippetForm from '../components/SnippetForm';
import SearchBar from '../components/SearchBar';


export default function Home({ snippets, onCreate, onEdit, onDelete, onSearch }) {
return (
<div>
<div className="mb-6">
<SnippetForm onSubmit={onCreate} />
</div>


<div className="mb-4">
<SearchBar onSearch={onSearch} />
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{snippets.map(s => (
<SnippetCard key={s._id} snippet={s} onEdit={() => onEdit(s)} onDelete={() => onDelete(s._id)} />
))}
</div>
</div>
);
}