document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  })
   .then(res => res.json())
  .then(data => {
    if (data.success) {
      if (data.role === "admin") {
        window.location.href = "/adminDashboard.html";
      } else {
        window.location.href = "/studDashboard.html";
      }
    } else {
      alert("Invalid login");
    }
  });
});
