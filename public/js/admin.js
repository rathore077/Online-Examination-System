function addExam() {
  const title = document.getElementById("title").value;

  fetch("/admin/add-exam", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
  .then(res => res.json())
  .then(() => alert("Exam Added"));
}

function addQuestion() {
  fetch("/add-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      exam_id: parseInt(document.getElementById("exam_id").value),
      question: document.getElementById("question").value,
      optionA: document.getElementById("A").value,
      optionB: document.getElementById("B").value,
      optionC: document.getElementById("C").value,
      optionD: document.getElementById("D").value,
      correct: document.getElementById("correct").value
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}

