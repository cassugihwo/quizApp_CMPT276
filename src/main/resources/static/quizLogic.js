document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "What is Nintendo's best selling game of all time?",
            choices: ["The Legend of Zelda: Breath of the Wild", "Pokémon Sword and Shield", "Mario Kart 8 Deluxe", "Animal Crossing: New Horizons"],
            correctAnswer: "Mario Kart 8 Deluxe"
        },
        {
            question: "What is the name of the creator of Minecraft?",
            choices: ["Jens Bergensten", "Markus Persson", "Nathan Söderblom", "Notch"],
            correctAnswer: "Markus Persson"
        },
        {
            question: "How many playable classes are there in Team Fortress 2?",
            choices: ["6", "7", "8", "9"],
            correctAnswer: "9"
        }
    ];
    let currentQuestion = 0;
    let score = 0;

    const quizSection = document.getElementById('quizSection');
    const resultsSection = document.getElementById('resultsSection');
    const scoreDisplay = document.getElementById('score');
    const correctAnswersList = document.getElementById('correctAnswers');

    function loadQuestion() {
        const currentQ = questions[currentQuestion];
        quizSection.innerHTML = `<h2>${currentQ.question}</h2>`;
        currentQ.choices.forEach((choice, index) => {
            quizSection.innerHTML += `<input type="radio" name="answer" value="${choice}" id="choice${index+1}">
                                      <label for="choice${index+1}">${choice}</label><br>`;
        });
    }

    function showResults() {
        scoreDisplay.textContent = `Your Score: ${score}/${questions.length}`;
        resultsSection.classList.remove('hidden');
        questions.forEach((q, index) => {
            const userAnswer = document.querySelector(`input[name="answer"]:checked`).value;
            const correctAnswer = q.correctAnswer;

            const li = document.createElement('li');
            li.textContent = `Q${index+1}: Your Answer - ${userAnswer}, Correct Answer - ${correctAnswer}`;
            correctAnswersList.appendChild(li);
        });
    }

    function highlightCorrectAnswer() {
        const correctIndex = questions[currentQuestion].choices.indexOf(questions[currentQuestion].correctAnswer);
        document.getElementById(`choice${correctIndex + 1}`).parentNode.classList.add('correct');
    }

    function checkAnswer() {
        const userAnswer = document.querySelector(`input[name="answer"]:checked`);
        if (userAnswer) {
            if (userAnswer.value === questions[currentQuestion].correctAnswer) {
                score++;
            }
            highlightCorrectAnswer();
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }
    }

    function init() {
        loadQuestion();

        document.getElementById('nextBtn').addEventListener('click', checkAnswer);
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        });
        document.getElementById('submitBtn').addEventListener('click', showResults);
    }

    init();
});
