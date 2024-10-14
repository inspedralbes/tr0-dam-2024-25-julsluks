const express = require('express');
const cors = require('cors');
const { v4: uuidv4, validate } = require('uuid');
const { isUuid } = require('uuidv4');
const { spawn } = require('child_process');
const fs = require('fs');
const jsonQuestions = require('./data/questions.json');
const e = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let questions = [];
const gameSessions = [];

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
                "id": tenQuestions[i].answers[j].id,
                "answer": tenQuestions[i].answers[j].answer
            };
        }
    }

    console.log("Las diez preguntas guardadas en servidor:");
    console.log(tenQuestions[0].answers[0]);
    // console.log(gameQuestions);

    gameSessions.push({
        "sessionToken": sessionToken,
        "questions": tenQuestions
    });

    res.send({
        sessionToken: sessionToken,
        questions: gameQuestions
    });
});

// End game
app.post('/game', (req, res) => {
    const sessionToken = req.body.sessionToken;
    const gameQuestions = req.body.questions;
    const clientGameAnswers = req.body.answers;

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const sessionIndex = gameSessions.findIndex(session => session.sessionToken == sessionToken);

    if (!sessionToken || !gameQuestions || sessionIndex === -1 || gameSessions[sessionIndex].questions.length != gameQuestions.length || !clientGameAnswers || clientGameAnswers.length != gameQuestions.length) {
        return res.status(400).send('Data is missing or incorrect');
    } else {
        console.log('Comienza la comprobación');
        
        for (let i = 0; i < gameSessions[sessionIndex].questions.length; i++) {
            for (let j = 0; j < gameSessions[sessionIndex].questions[i].answers.length; j++) {
                if (gameSessions[sessionIndex].questions[i].answers[j].correct == true) {
                    if (clientGameAnswers[i].answer == gameSessions[sessionIndex].questions[i].answers[j].id) {
                        correctAnswers++;
                    } else {
                        incorrectAnswers++;
                    }
                }
            }
        }

        createJsonStatistics(correctAnswers, incorrectAnswers, clientGameAnswers, gameSessions[sessionIndex].questions);
    }

    gameSessions.splice(sessionIndex, 1);

    res.send({
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers
    });
});

// Get statistics
app.get('/statistics', (req, res) => {
    console.log('Estadísticas');
    const process = spawn('python', ['../python/statistics.py']);
    process.stdout.on('data', data => {
        console.log(data.toString());
        res.send(data.toString());
    });
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

function createJsonStatistics (correctAnswers, incorrectAnswers, clientGameAnswers, serverGameQuestions) {
    const date = new Date();
    const dateString = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    const dir = `./data/${dateString}`;
    const statistics = {
        "totalData": {
            "date": dateString,
            "totalGames": 0,
            "correctAnswers": correctAnswers,
            "incorrectAnswers": incorrectAnswers
        },
        questionsStatistics: []
    };

    console.log('Estadísticas:' + dir);   

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.writeFileSync(`${dir}/statistics.json`, JSON.stringify(statistics));
    }

    let existentFile = fs.readFileSync(`${dir}/statistics.json`);
    existentFile = JSON.parse(existentFile);

    console.log('Estadísticas:' + existentFile);

    existentFile.totalData.totalGames++;
    for (let i = 0; i < serverGameQuestions.length; i++) {
        const questionId = serverGameQuestions[i].id;
        let questionStats = existentFile.questionsStatistics.find(q => q.id == questionId);

        if (!questionStats) {
            questionStats = {
                id: questionId,
                attempts: 0,
                correctAnswers: 0,
                incorrectAnswers: 0,
                answers: serverGameQuestions[i].answers.map(answer => ({
                    text: answer.answer,
                    selected: 0 
                }))
            };
            existentFile.questionsStatistics.push(questionStats);
        }

        questionStats.attempts++;

        const clientAnswerId = clientGameAnswers[i].answer;
        const selectedAnswer = serverGameQuestions[i].answers.find(a => a.id == clientAnswerId);
    
        if (selectedAnswer) {
            if (selectedAnswer.correct) {
                questionStats.correctAnswers++;
            } else {
                questionStats.incorrectAnswers++;
            }

            let answerStats = questionStats.answers.find(a => a.text === selectedAnswer.answer);
            if (answerStats) {
                answerStats.selected++;
            }
        }
    }

    fs.writeFileSync(`${dir}/statistics.json`, JSON.stringify(existentFile));
}