const URL = 'http://localhost:3000';

export async function findAllQuestions() {
    const response = await fetch(`${URL}/questions`);
    let data = await response.json();
    return data;
}

export async function createQuestion(question) {
    const response = await fetch(`${URL}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });
    let data = await response.json();
    return data;
}

export async function updateQuestion(question) {
    const response = await fetch(`${URL}/questions/${question.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });
    let data = await response.json();
    return data;
}

export async function deleteQuestion(id) {
    const response = await fetch(`${URL}/questions/${id}`, {
        method: 'DELETE'
    });
    let data = await response.json();
    return data;
}