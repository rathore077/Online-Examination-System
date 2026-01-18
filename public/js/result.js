const score = localStorage.getItem("score");

if (!score) {
  document.getElementById("score").innerText = "No result found";
} else {
  document.getElementById("score").innerText =
    "Your Score is: " + score;
}
