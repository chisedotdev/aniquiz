var express = require('express');
var axios = require('axios');
var router = express.Router();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get('/', async (req, res) => {
  try {
    const resp = await axios.get('https://opentdb.com/api.php?amount=10&category=31&type=multiple');
    let questions = resp.data.results;
    const correctAnswers = questions.map(question => decode(question.correct_answer));
    questions = questions.map(question => {
      const answers = [...question.incorrect_answers, question.correct_answer];
      question.answers = shuffle(answers);
      return question;
    });
    res.render('quiz', { 'title': 'Quiz', questions, correctAnswers });
  } catch (error) {
    res.status(500).send('Error retrieving data from OpenTDB');
  }
});

router.post('/', async (req, res) => {
  const { userAnswers = [], correctAnswers = [] } = req.body;
  let score = 0;
  if(userAnswers.length === 0 ) {
    return res.json({ score });
  }

  userAnswers.forEach((answer, index) => {
    if(answer === correctAnswers[index]) {
      score++;
    }
  });

  return res.json({ score });
});

module.exports = router;
