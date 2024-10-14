const URL = 'http://localhost:3000'; //development
// const URL = 'http://tr0.a22betvilver.dam.inspedralbes.cat:21277'; //production

//Read all (OKAY)
export async function findAllQuestions() {
    const response = await fetch(`${URL}/questions`);
    let data = await response.json();
    return data;
}

//Create (OKAY)
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

//Update (OKAY)
export async function updateQuestion(question) {
    const response = await fetch(`${URL}/questions/${question.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });
    const text = await response.text();
    return text;
}

//Delete (OKAY)
export async function deleteQuestion(id) {
    const response = await fetch(`${URL}/questions/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const textResponse = await response.text(); // Obtener respuesta como texto
    return textResponse;
}