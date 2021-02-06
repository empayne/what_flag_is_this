export class Answers {
    constructor(name, image){
        this.correctAnswers = []
        this.incorrectAnswers = []
    }

    checkAndRecordAnswer(question, answer){
        let correctAnswer = question.correctAnswer.name
        let correct = answer === correctAnswer

        if (correct) {
            this.correctAnswers.push(question)
        } else {
            this.incorrectAnswers.push(question)
        }

        return correctAnswer
    }
}