// =========================
// GET SUBJECT FROM URL
// =========================

const urlParams = new URLSearchParams(window.location.search);

const subject = urlParams.get("subject") || "english";


document.getElementById("subjectName").textContent =
subject.charAt(0).toUpperCase() + subject.slice(1);


// =========================
// LOAD SUBJECT QUESTIONS
// =========================

let questions = [];


switch(subject){

case "english":
questions = englishQuestions;
break;

case "mathematics":
questions = mathematicsQuestions;
break;

case "biology":
questions = biologyQuestions;
break;

case "physics":
questions = physicsQuestions;
break;

case "chemistry":
questions = chemistryQuestions;
break;

case "government":
questions = governmentQuestions;
break;

case "crs":
questions = crsQuestions;
break;

case "literature":
questions = literatureQuestions;
break;

default:
questions = englishQuestions;

}


// =========================
// RANDOMIZE ARRAY FUNCTION
// =========================

function shuffle(array){

return array.sort(() => Math.random() - 0.5);

}


// =========================
// PREPARE QUESTIONS
// =========================

// Pick only 40 questions

questions = shuffle([...questions])
.slice(0,40);


// Randomize options

questions = questions.map(q => {


let options = [...q.options];

let correctAnswer = q.answer;


options = shuffle(options);


return {

question:q.question,

options:options,

answer:correctAnswer

};


});


// =========================
// VARIABLES
// =========================

let currentQuestion = 0;

let userAnswers = [];


// =========================
// TIMER SETTINGS
// =========================

let timeLeft = 30 * 60;
// =========================
// DISPLAY QUESTION
// =========================

function showQuestion(){

let q = questions[currentQuestion];

document.getElementById("questionNumber").textContent =
"Question " + (currentQuestion + 1) + " of " + questions.length;


document.getElementById("questionText").textContent =
q.question;


let optionsHTML = "";


q.options.forEach(option => {

optionsHTML += `

<label>
<input type="radio" name="answer" value="${option}">
${option}
</label>
<br>

`;

});


document.getElementById("options").innerHTML = optionsHTML;



// Restore previously selected answer
if (userAnswers[currentQuestion]) {

    const radios = document.querySelectorAll('input[name="answer"]');

    radios.forEach(radio => {

        if (radio.value === userAnswers[currentQuestion]) {

            radio.checked = true;

        }

    });

}
}



// =========================
// NEXT QUESTION
// =========================

function nextQuestion(){

let selected = document.querySelector(
'input[name="answer"]:checked'
);


if(selected){

userAnswers[currentQuestion] = selected.value;

}


currentQuestion++;


if(currentQuestion < questions.length){

showQuestion();

}else{

submitExam();

}
}
// =========================
// PREVIOUS QUESTION
// =========================

function previousQuestion(){

    // Save the current selected answer
    let selected = document.querySelector('input[name="answer"]:checked');

    if(selected){

        userAnswers[currentQuestion] = selected.value;

    }

    if(currentQuestion > 0){

        currentQuestion--;

        showQuestion();

    }

}

// =========================
// START TIMER
// =========================

function startTimer(){

let timer = setInterval(()=>{


let minutes = Math.floor(timeLeft / 60);

let seconds = timeLeft % 60;


document.getElementById("timer").textContent =
minutes + ":" + (seconds < 10 ? "0" : "") + seconds;



timeLeft--;



if(timeLeft < 0){

clearInterval(timer);

submitExam();

}


},1000);


}



// =========================
// SUBMIT EXAM
// =========================

function submitExam(){


let score = 0;


questions.forEach((q,index)=>{


if(userAnswers[index] === q.answer){

score++;

}


});



localStorage.setItem(
"score",
score
);


localStorage.setItem(
"total",
questions.length
);



window.location.href="result.html";


}

// =========================
// BUTTON EVENTS
// =========================

document.getElementById("nextBtn").addEventListener("click", nextQuestion);

document.getElementById("prevBtn").addEventListener("click", previousQuestion);

document.getElementById("submitBtn").addEventListener("click", submitExam);

// =========================
// START EXAM
// =========================

showQuestion();

startTimer();






