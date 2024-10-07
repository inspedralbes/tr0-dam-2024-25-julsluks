const URL = 'http://localhost:3000';

export async function findAllQuestions() {
    const response = await fetch(`${URL}/questions`);
    let data = await response.json();
    return data;
}