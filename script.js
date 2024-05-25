let question_field = document.querySelector('.question')
let main = document.querySelector('.container-main')
let answer_buttons = document.querySelectorAll('.answer')
let start_btn = document.querySelector('.start-btn')
let container_start = document.querySelector('.container-start')
let result = document.querySelector('.result')
let cor_answers = 0
let total_answers = 0
function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}
let signs = ['+', '-', '/', '*']
function returnRandSign(){
    return signs[randint(0,3)]
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array; // Возвращаем перемешанный массив
}
class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = returnRandSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+'){
            this.correct = a + b
        }else if (sign == '-'){
            this.correct = a - b
        }else if (sign == '*'){
            this.correct = a * b
        }else if (sign == '/'){
            this.correct = a / b
        }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 15, this.correct + 1),
            randint(this.correct + 15, this.correct + 1)
        ]
        shuffle(this.answers)
    }
    display(){
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i++){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let currentQuestion

start_btn.addEventListener('click', function(){
    setTimeout(function(){
        start_btn.innerHTML = '3'
    }, 0)
    setTimeout(function(){
        start_btn.innerHTML = '2'
    }, 1000)
    setTimeout(function(){
        start_btn.innerHTML = '1'
    }, 2000)
    setTimeout(function(){
        start_btn.innerHTML = 'GO'
    }, 3000)

    setTimeout(function(){
        main.style.display = 'flex'
        container_start.style.display = 'none'
        }, 4000)

    currentQuestion = new Question()
    currentQuestion.display()
    

    setTimeout(function(){
        main.style.display = 'none'
        container_start.style.display = 'flex'
        result.innerHTML = `Правильных ответов: ${cor_answers}; Всего ответов: ${total_answers}`
        start_btn.innerHTML = 'Старт'
        start_btn.style.background = '#000'
    }, 60000)
})

for(let i = 0; i < answer_buttons.length; i++){
    answer_buttons[i].addEventListener('click', function(){
        if(answer_buttons[i].innerHTML == currentQuestion.correct){
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
            cor_answers++
        }else{
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers++
        result.innerHTML = `Правильных ответов: ${cor_answers}, всего ответов: ${total_answers}`
        currentQuestion = new Question()
        currentQuestion.display()
    })
}
