let subject = localStorage.getItem("subject");

let questions = [];

if(subject === "Mathematics"){
    questions = mathematicsQuestions;
}
else if(subject === "English"){
    questions = englishQuestions;
}
else if(subject === "Biology"){
    questions = biologyQuestions;
}
else if(subject === "Chemistry"){
    questions = chemistryQuestions;
}
else if(subject === "Physics"){
    questions = physicsQuestions;
}
else if(subject === "Government"){
    questions = governmentQuestions;
}
else if(subject === "CRS"){
    questions = crsQuestions;
}
else if(subject === "Literature"){
    questions = literatureQuestions;
}

questions = questions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 3600;

document.getElementById("subjectTitle").innerText = subject;

function generateQuestionNumbers(){

    let numbers = "";

    for(let i = 0; i < questions.length; i++){

        let className = "";

        if(i === currentQuestion){

            className = "current-question";

        }
        else if(userAnswers[i]){

            className = "answered-question";

        }
        else{

            className = "unanswered-question";

        }

        numbers += `
        <button
        class="${className}"
        onclick="goToQuestion(${i})">
        ${i + 1}
        </button>
        `;
    }

    document.getElementById("questionNumbers").innerHTML = numbers;
}

function goToQuestion(index){

    currentQuestion = index;

    loadQuestion();
}

function loadQuestion(){

    let q = questions[currentQuestion];

    document.getElementById("question").innerText =
    (currentQuestion + 1) + ". " + q.question;

    let optionsHTML = "";

    q.options.forEach((option,index)=>{

        let selected = "";

        if(userAnswers[currentQuestion] === option){

            selected =
            "style='background:#90caf9;color:black;'";
        }

        optionsHTML += `
        <button
        class="option-btn"
        ${selected}
        onclick="checkAnswer(${index})">
        ${option}
        </button>
        <br><br>
        `;
    });

    document.getElementById("options").innerHTML =
    optionsHTML;

    generateQuestionNumbers();
}

function checkAnswer(index){

    userAnswers[currentQuestion] =
    questions[currentQuestion].options[index];

    loadQuestion();
}

function nextQuestion(){

    if(currentQuestion < questions.length - 1){

        currentQuestion++;

        loadQuestion();
    }
}

function previousQuestion(){

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();
    }
}

function finishExam(){

    let confirmSubmit =
    confirm("Are you sure you want to submit your exam?");

    if(!confirmSubmit){
        return;
    }

    let score = 0;

    for(let i = 0; i < questions.length; i++){

        if(userAnswers[i] === questions[i].answer){

            score++;
        }
    }

    localStorage.setItem("score", score);

    localStorage.setItem(
        "totalQuestions",
        questions.length
    );

    localStorage.setItem(
        "subject",
        subject
    );

    window.location.href = "result.html";
}

function startTimer(){

    let timer =
    document.getElementById("timer");

    let countdown = setInterval(()=>{

        let minutes =
        Math.floor(timeLeft / 60);

        let seconds =
        timeLeft % 60;

        timer.innerText =
        minutes + ":" +
        seconds.toString().padStart(2,"0");

        timeLeft--;

        if(timeLeft < 0){

            clearInterval(countdown);

            let score = 0;

            for(let i = 0; i < questions.length; i++){

                if(userAnswers[i] === questions[i].answer){

                    score++;
                }
            }

            localStorage.setItem("score", score);

            localStorage.setItem(
                "totalQuestions",
                questions.length
            );

            localStorage.setItem(
                "subject",
                subject
            );

            window.location.href =
            "result.html";
        }

    },1000);
}

generateQuestionNumbers();

loadQuestion();

startTimer();

