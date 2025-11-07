import express from 'express';
import snippetRoutes from './routes/snippets.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/snippets', snippetRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/snippetdb';


mongoose
.connect(MONGO_URI)
.then(() => {
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error('❌ DB connection error:', err));


// backend/models/Snippet.js
import mongoose from 'mongoose';


const SnippetSchema = new mongoose.Schema(
{
title: { type: String, required: true },
code: { type: String, required: true },
language: { type: String, default: 'plaintext' },
tags: [String],
},
{ timestamps: true }
);


export default mongoose.model('Snippet', SnippetSchema);


// backend/routes/snippets.js
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


// READ all
router.get('/', async (req, res) => {
const snippets = await Snippet.find().sort({ createdAt: -1 });
res.json(snippets);
});


// READ one
router.get('/:id', async (req, res) => {
const snippet = await Snippet.findById(req.params.id);
res.json(snippet);
});


// UPDATE
router.put('/:id', async (req, res) => {
const updated = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
});


// DELETE
router.delete('/:id', async (req, res) => {
await Snippet.findByIdAndDelete(req.params.id);
res.json({ message: 'Snippet deleted' });
});


export default router;