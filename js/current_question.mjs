export class CurrentQuestion {
    constructor(questions){
        this.questions = questions
        this.index = -1
    }

    getQuestion(){
        return this.questions[this.index]
    }

    getIndex(){
        return this.index
    }

    next(){
        this.index++
        return this.getQuestion()
    }
}