import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markup';


export default function SnippetCard({ snippet, onEdit, onDelete }) {
useEffect(() => { Prism.highlightAll(); }, [snippet]);


return (
<div className="bg-white p-4 rounded-lg shadow">
<div className="flex justify-between items-start">
<div>
<h3 className="font-medium">{snippet.title}</h3>
<div className="text-xs text-slate-500">{snippet.language} • {new Date(snippet.createdAt).toLocaleString()}</div>
</div>
<div className="flex gap-2">
<button onClick={onEdit} className="text-sm px-2 py-1 bg-slate-100 rounded">Edit</button>
<button onClick={onDelete} className="text-sm px-2 py-1 bg-red-50 text-red-600 rounded">Delete</button>
</div>
</div>


<pre className={`language-${snippet.language} mt-3`}>
<code className={`language-${snippet.language}`}>
{snippet.code}
</code>
</pre>


<div className="mt-2 text-xs text-slate-600">{(snippet.tags || []).join(', ')}</div>
</div>
);
}