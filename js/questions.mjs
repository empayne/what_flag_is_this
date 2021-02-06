import  { Question } from './question.mjs'

export const OPTIONS_PER_QUESTION = 4

export class Questions {
    constructor(flags){
        this.flags = flags
    }

    generate(){
        let questions = this.flags.map(
            (flag, index) => new Question(flag, this._options(index))
        )
        this._shuffle(questions)
        return questions
    }

    _options(correctAnswerIndex) {
        let indices = []
        while (indices.length < OPTIONS_PER_QUESTION - 1) {
            let randomIndex = Math.floor(
                Math.random() * Math.floor(this.flags.length)
            )
            if (this._valid_index(randomIndex, correctAnswerIndex, indices)) {
                indices.push(randomIndex)
            }
        }

        return indices.map((index) => this.flags[index])
    }

    _valid_index(candidate_index, correctAnswerIndex, indices) {
        let isDuplicate = indices.includes(candidate_index)
        let isCorrectAnswerIndex = candidate_index == correctAnswerIndex
        return !(isDuplicate || isCorrectAnswerIndex)
    }

    _shuffle(array) {
        // Copy + paste from https://stackoverflow.com/questions/2450954
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}