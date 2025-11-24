import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetCard = ({ snippet, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="bg-dark-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{snippet.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{snippet.description}</p>
          </div>
          <span className="bg-blue-600 text-xs px-2 py-1 rounded">
            {snippet.language}
          </span>
        </div>

        <div className="mb-4">
          <SyntaxHighlighter
            language={snippet.language.toLowerCase()}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              maxHeight: '200px',
              fontSize: '0.875rem'
            }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition duration-200"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <Link
              to={`/edit/${snippet.id}`}
              className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition duration-200"
            >
              Edit
            </Link>
          </div>
          
          <button
            onClick={() => onDelete(snippet.id)}
            className="text-red-500 hover:text-red-400 text-sm transition duration-200"
          >
            Delete
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-xs text-gray-500">
            Last updated: {new Date(snippet.updatedAt?.toDate()).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;