const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let items = [];

// Create
app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send(item);
});

// Read
app.get('/items', (req, res) => {
    res.send(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.send(item);
});

// Update
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    Object.assign(item, req.body);
    res.send(item);
});

// Delete
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.send(deletedItem);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});