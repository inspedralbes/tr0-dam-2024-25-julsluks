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

//CRUD Questions
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
    if (questionIndex === -1) {
        res.status(404).send('Question not found');
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

//Game logic
// Start game
app.get('/game', (req, res) => {
    let gameQuestions = [];
    const sessionToken = getSessionToken(req.body.sessionToken);

    const shuffledQuestions = jsonQuestions.questions.sort(() => 0.5 - Math.random());
    const tenQuestions = shuffledQuestions.slice(0, 10);

    for (let i = 0; i < tenQuestions.length; i++) {
        gameQuestions[i] = {
            "id": tenQuestions[i].id,
            "question": tenQuestions[i].question,
            "answers": [],
            "image": tenQuestions[i].image
        };
        for (let j = 0; j < tenQuestions[i].answers.length; j++) {
            gameQuestions[i].answers[j] = {
                "answer": tenQuestions[i].answers[j].answer
            };
        }
    }

    console.log(gameQuestions);

    res.send({
        sessionToken: sessionToken,
        questions: gameQuestions
    });
});

// End game
app.post('/game', (req, res) => {
    const sessionToken = req.body.sessionToken;
    const gameQuestions = req.body.questions;

    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function getSessionToken (token) {
    if (token) {
        return token;
    } else {
        return uuidv4();
    }
}