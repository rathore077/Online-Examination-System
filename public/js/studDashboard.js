fetch("/exams")
  .then(res => res.json())
  .then(data => {
    let html = "";
    data.forEach(exam => {
      html += `
        <p>${exam.title}
        <button onclick="startExam(${exam.id})">Start</button></p>
      `;
    });
    document.getElementById("exams").innerHTML = html;
  });

function startExam(id) {
  localStorage.setItem("examId", id);
  window.location.href = "/exam.html";
}
