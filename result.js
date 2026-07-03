let subject = localStorage.getItem("subject");

let score = localStorage.getItem("score");

let total = localStorage.getItem("totalQuestions");


document.getElementById("subject").innerText =
"Subject: " + subject;


document.getElementById("score").innerText =
"Score: " + score + "/" + total;


let percentage = (score / total) * 100;


document.getElementById("percentage").innerText =
"Percentage: " + percentage.toFixed(1) + "%";


if(percentage >= 50){

document.getElementById("status").innerText =
"Status: PASS";

}
else{

document.getElementById("status").innerText =
"Status: FAIL";

}



function goHome(){

window.location.href = "index.html";

}
