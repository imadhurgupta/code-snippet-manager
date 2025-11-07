import express from 'express';
import Snippet from '../models/Snippet.js';


const router = express.Router();


// CREATE
router.post('/', async (req, res) => {
try {
const snippet = new Snippet(req.body);
const saved = await snippet.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// READ all (with optional search query ?q=)
router.get('/', async (req, res) => {
try {
const { q } = req.query;
let filter = {};
if (q) {
const regex = new RegExp(q, 'i');
filter = { $or: [{ title: regex }, { code: regex }, { tags: regex }, { language: regex }] };
}
const snippets = await Snippet.find(filter).sort({ createdAt: -1 });
res.json(snippets);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// READ one
router.get('/:id', async (req, res) => {
try {
const snippet = await Snippet.findById(req.params.id);
if (!snippet) return res.status(404).json({ error: 'Not found' });
res.json(snippet);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// UPDATE
router.put('/:id', async (req, res) => {
try {
const updated = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// DELETE
router.delete('/:id', async (req, res) => {
try {
await Snippet.findByIdAndDelete(req.params.id);
res.json({ message: 'Snippet deleted' });
} catch (err) {
res.status(500).json({ error: err.message });
}
});


export default router;