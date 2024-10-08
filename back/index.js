const express = require('express');
const cors = require('cors');
const { v4: uuidv4, validate } = require('uuid');
const { isUuid } = require('uuidv4');
const { spawn } = require('child_process');
const fs = require('fs');
const jsonQuestions = require('./data/questions.json');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let questions = [];

// Create
app.post('/questions', (req, res) => {
    const question = req.body;
    questions.push(question);
    res.status(201).send(question);
});

// Read
app.get('/questions', (req, res) => {
    res.send(jsonQuestions.questions);
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
app.delete('/questions/:id', (req, res) => {
    const questionIndex = questions.findIndex(question => question.id === parseInt(req.params.id));
    if (questionIndex === -1) return res.status(404).send('Item not found');

    const deletedQuestion = items.splice(questionIndex, 1);
    res.send(deletedQuestion);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});