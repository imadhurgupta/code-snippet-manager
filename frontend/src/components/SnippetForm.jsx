import React, { useState } from 'react';


export default function SnippetForm({ onSubmit, initialValues = {}, submitLabel = 'Create' }) {
const [title, setTitle] = useState(initialValues.title || '');
const [code, setCode] = useState(initialValues.code || '');
const [language, setLanguage] = useState(initialValues.language || 'javascript');
const [tags, setTags] = useState(initialValues.tags || '');


const handle = (e) => {
e.preventDefault();
const payload = {
title,
code,
language,
tags: tags.split(',').map(t => t.trim()).filter(Boolean)
};
onSubmit(payload);
setTitle(''); setCode(''); setTags('');
};


return (
<form onSubmit={handle} className="bg-white p-4 rounded shadow">
<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
<input className="p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
<select className="p-2 border rounded" value={language} onChange={e => setLanguage(e.target.value)}>
<option value="javascript">JavaScript</option>
<option value="python">Python</option>
<option value="markup">HTML</option>
<option value="bash">Bash</option>
<option value="plaintext">Plaintext</option>
</select>
<input className="p-2 border rounded" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
</div>


<textarea className="w-full p-2 border rounded h-40" placeholder="Your code" value={code} onChange={e => setCode(e.target.value)} required />


<div className="mt-2 flex gap-2">
<button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{submitLabel}</button>
</div>
</form>
);
}