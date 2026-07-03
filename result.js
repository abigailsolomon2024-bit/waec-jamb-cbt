// =========================
// LOAD RESULT
// =========================


const score =
localStorage.getItem("score");


const total =
localStorage.getItem("total");


const percentage =
localStorage.getItem("percentage");


const subject =
localStorage.getItem("subject");



document.getElementById("subject").innerHTML =
subject + " Result";



document.getElementById("score").innerHTML =
score + " / " + total;



document.getElementById("percentage").innerHTML =
percentage + "%";



// =========================
// GRADE SYSTEM
// =========================

let grade;
let message;


if (percentage >= 80) {

    grade = "A";
    message = "Excellent Performance 🎉";

}

else if (percentage >= 70) {

    grade = "B";
    message = "Very Good Performance 👏";

}

else if (percentage >= 60) {

    grade = "C";
    message = "Good Performance 👍";

}

else if (percentage >= 50) {

    grade = "D";
    message = "Fair Performance";

}

else {

    grade = "F";
    message = "Keep Practicing. Try Again.";

}



document.getElementById("grade").innerHTML =
grade;


document.getElementById("message").innerHTML =
message;



// =========================
// BUTTON FUNCTIONS
// =========================


function retakeExam(){

    localStorage.removeItem("score");
    localStorage.removeItem("percentage");

    window.location.href="exam.html";

}



function goDashboard(){

    window.location.href="dashboard.html";

}

