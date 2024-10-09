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

// Create (OKAY)
app.post('/questions', (req, res) => {
    const question = req.body;
    if (!question.question || !question.answers || question.answers.length < 4 || !question.image) {
        res.status(400).send('Data is missing or incorrect');
    } else {
        jsonQuestions.questions.push({
            "id": jsonQuestions.questions[jsonQuestions.questions.length - 1].id + 1,
            "question": question.question,
            "answers": question.answers,
            "image": question.image
        });
        fs.writeFileSync('./data/questions.json', JSON.stringify(jsonQuestions));
        res.status(201).send('Added question');
    }
    questions.push(question);
    res.status(201).send(question);
});

// Read all (OKAY)
app.get('/questions', (req, res) => {
    res.send(jsonQuestions.questions);
});

// Update (OKAY)
app.put('/questions/:id', (req, res) => {
    const questionIndex = jsonQuestions.questions.findIndex(question => question.id == parseInt(req.params.id));
    const updateQuestion = req.body;
    if (!questionIndex) {
        return res.status(404).send('Question not found');
    } else {
        if (!updateQuestion.question || !updateQuestion.answers || updateQuestion.answers.length < 4 || !updateQuestion.image) {
            res.status(400).send('Data is missing or incorrect');
        } else {
            jsonQuestions.questions[questionIndex] = {
                "id": parseInt(req.params.id),
                "question": updateQuestion.question,
                "answers": updateQuestion.answers,
                "image": updateQuestion.image
            };
            fs.writeFileSync('./data/questions.json', JSON.stringify(jsonQuestions));
            res.status(201).send('Updated question');
        }
    }
});

// Delete (OKAY)
app.delete('/questions/:id', (req, res) => {
    const questionIndex = jsonQuestions.questions.findIndex(question => question.id == parseInt(req.params.id));
    if (questionIndex === -1) {
        return res.status(404).send('Question not found');
    } else {
        jsonQuestions.questions.splice(questionIndex, 1);
        fs.writeFileSync('./data/questions.json', JSON.stringify(jsonQuestions));
        res.send('Question deleted');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});