const express = require ("express");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


app.post("/login",(req,res)=>{
  console.log("LOGIN ROUTE HIT");
  console.log(req.body);
    const{email,password,role}=req.body;
    db.query(
    "SELECT * FROM users WHERE email=? AND password=? AND role=?",
    [email, password,role],
    (err, result) => {

      if (err) {
        return res.json({ success: false });
      }

      if (result.length > 0) {
        res.json({
          success:true,
          role: result[0].role
        });
      }else{
        res.json({success:false});
      }
    }
  );
});


app.get("/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, result) => {
    res.json(result);
  });
});
app.get("/questions/:examId", (req, res) => {
  const examId = req.params.examId;

  db.query(
    "SELECT * FROM questions WHERE exam_id = ?",
    [examId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


// Submit Exam
app.post("/submit", (req, res) => {
  const score = req.body.score;
  db.query(
    "INSERT INTO results (userId, score) VALUES (1, ?)",
    [score],
    () => res.send("Exam Submitted")
  );
});




app.post("/add-question", (req, res) => {
  
 console.log("Add Question route hit");
  console.log(req.body); 
  const {
    exam_id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correct
  } = req.body;

  if (!exam_id || !question) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sql = `
    INSERT INTO questions
    (exam_id, question, optionA, optionB, optionC, optionD, correct)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [exam_id, question, optionA, optionB, optionC, optionD, correct],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Question added successfully" });
    }
  );
});



app.post("/add-exam", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO exams (title) VALUES (?)",
    [title],
    () => res.json({ success: true })
  );
});

// app.get("/api/exams", (req, res) => {
//   db.query("SELECT * FROM exams", (err, result) => {
//     res.json(result);
//   });
// });

app.get("/exams", (req, res) => {
  db.query("SELECT * FROM exams", (err, result) => {
    res.json(result);
  });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});