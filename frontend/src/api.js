import axios from 'axios';


const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api' });


export const fetchSnippets = (q) => API.get('/snippets', { params: q ? { q } : {} }).then(r => r.data);
export const createSnippet = (payload) => API.post('/snippets', payload).then(r => r.data);
export const updateSnippet = (id, payload) => API.put(`/snippets/${id}`, payload).then(r => r.data);
export const deleteSnippet = (id) => API.delete(`/snippets/${id}`).then(r => r.data);
export const getSnippet = (id) => API.get(`/snippets/${id}`).then(r => r.data);


export default API;