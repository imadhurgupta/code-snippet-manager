import mongoose from 'mongoose';


const SnippetSchema = new mongoose.Schema(
{
title: { type: String, required: true },
code: { type: String, required: true },
language: { type: String, default: 'plaintext' },
tags: { type: [String], default: [] }
},
{ timestamps: true }
);


export default mongoose.model('Snippet', SnippetSchema);