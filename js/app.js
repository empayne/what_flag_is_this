// As a user of the flag guessing game, I:
//  - see an image of a flag
//  - see multiple text names of locations
//  - select the correct name from those options
//  - repeat the above for all N flags supported via emojis
//  - see which flags I got correct/incorrect at the end  

import { Flags } from './flags.mjs'
import  { Questions, OPTIONS_PER_QUESTION } from './questions.mjs'
import { CurrentQuestion } from './current_question.mjs'
import { Answers } from './answers.mjs'

var flags = new Flags().getAll()
var questions = new Questions(flags).generate()
var currentQuestion = new CurrentQuestion(questions)
var answers = new Answers()

window.addEventListener('load', () => {
    for(var i = 0; i < OPTIONS_PER_QUESTION; i++){
        document.querySelector(`#answer_${i}`).onclick = answerSelected
    }

    showNextQuestion()
});

function answerSelected(click){
    let userAnswer = click.srcElement.textContent
    let correctAnswer = answers.checkAndRecordAnswer(currentQuestion.getQuestion(), userAnswer)
    updateCorrectnessText(userAnswer, correctAnswer)
    showNextQuestion()
}

function updateCorrectnessText(userAnswer, correctAnswer){
    let correct = userAnswer === correctAnswer
    let text = correct ? `✅ ${userAnswer} is correct!` : `❌ ${correctAnswer} was the correct answer.`
    document.querySelector('#previous_answer_correct').textContent = text
}

function showNextQuestion(){
    let question = currentQuestion.next()

    if (question === undefined) { // in the end state
        processEndGame()
    } else {
        let answers = question
            .incorrectAnswers
            .map((incorrectAnswer) => incorrectAnswer.name)
            .concat(question.correctAnswer.name)

        shuffle(answers)

        document.querySelector('#flag').textContent = question.correctAnswer.image

        for(var i = 0; i < OPTIONS_PER_QUESTION; i++){
        document.querySelector(`#answer_${i}`).textContent = answers[i]
        }

        document.querySelector('#number_questions_complete').textContent = `🌏 ${currentQuestion.getIndex() + 1}/${questions.length}`
    }
}

function processEndGame(){
    document.querySelector('#previous_answer_correct').textContent = `🌎 You scored ${answers.correctAnswers.length}/${questions.length}!`
    document.querySelector('#number_questions_complete').textContent = `🔄 Reload to play again with different flags.`
    document.querySelector('#flag').classList.add('hide')
    document.querySelector('#question_container').classList.add('hide')
    document.querySelector('#endgame_container').classList.remove('hide')

    let correctList = document.querySelector('#endgame_correct')
    let incorrectList = document.querySelector('#endgame_incorrect')

    for (const answer of answers.correctAnswers){
        let element = `<li>${answer.correctAnswer.image} ${answer.correctAnswer.name}</li>`
        correctList.innerHTML += element  
    }

    for (const answer of answers.incorrectAnswers){
        let element = `<li>${answer.correctAnswer.image} ${answer.correctAnswer.name}</li>`
        incorrectList.innerHTML += element  
    }
}

function shuffle(array) {
    // Copy + paste from https://stackoverflow.com/questions/2450954
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
