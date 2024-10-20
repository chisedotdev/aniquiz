const submitBtn = document.getElementsByClassName('submit-btn')[0];

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const userAnswers = [...document.querySelectorAll('input[type="radio"]:checked')].map(input => input.value);
    // send fetch request
    const resp = await fetch('/quiz', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ 'userAnswers': userAnswers, 'correctAnswers': correctAnswers }),
    });
    const result = await resp.json();
    const scoreTag = document.getElementById('score');
    scoreTag.textContent = `${result.score}/10`;
    const modal = document.getElementById('result');
    modal.classList.toggle('modal-show');
});

function clearAnswers() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
        radio.checked = false;
    });
}

const clearBtn = document.getElementsByClassName('clear-btn')[0];
clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearAnswers();
});