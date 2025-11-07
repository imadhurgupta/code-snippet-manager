import React, { useState } from 'react';
import SnippetForm from '../components/SnippetForm';


export default function SnippetEditor({ snippet, onSave, onCancel }) {
const [loading, setLoading] = useState(false);


return (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center p-6">
<div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg">
<h2 className="text-xl font-semibold mb-4">Edit Snippet</h2>
<SnippetForm
initialValues={{
title: snippet.title,
code: snippet.code,
language: snippet.language,
tags: (snippet.tags || []).join(', ')
}}
onSubmit={async (vals) => { setLoading(true); await onSave(vals); setLoading(false); }}
submitLabel={loading ? 'Saving...' : 'Save'}
/>
<button className="mt-2 text-sm text-slate-600" onClick={onCancel}>Cancel</button>
</div>
</div>
);
}