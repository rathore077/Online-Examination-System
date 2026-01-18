let questionsData = [];

const examId = localStorage.getItem("examId");

fetch(`/questions/${examId}`)

  .then(res => res.json())
  .then(data => {
   questionsData = data;
    let html = "";
    data.forEach((q, i) => {
      html += `
        <p>${q.question}</p>
        <input type="radio" name="q${i}" value="A">${q.optionA}<br>
        <input type="radio" name="q${i}" value="B">${q.optionB}<br>
        <input type="radio" name="q${i}" value="C">${q.optionC}<br>
        <input type="radio" name="q${i}" value="D">${q.optionD}<br>
      `;
    });
    document.getElementById("questions").innerHTML = html;
  });

function submitExam() {
  if (examSubmitted) return;
  examSubmitted= true;
  let score = 0;

  questionsData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (selected && selected.value === q.correct) {
      score++;
    }
  });

  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score })
  })
  .then(() => {
    localStorage.setItem("score", score);
    window.location.href = "/result.html";
  });
}


let totalTime = 1 * 60;
let timerInterval;
let examSubmitted = false;

function startTimer() {
  const timerEl = document.getElementById("timer");

  timerInterval = setInterval(() => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    timerEl.innerText = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (totalTime <= 0) {
      clearInterval(timerInterval);
      alert("Time is up! Exam will be submitted.");
      submitExam(); // auto submit
    }

    totalTime--;
  }, 1000);
}

startTimer();

// Prevent refresh / leaving during exam
window.onbeforeunload = function () {
  return "Exam in progress. Leaving will submit the exam.";
};


