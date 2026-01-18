let express=require("express")
let app=express();

app.use(express.json())

app.get("/student-read",(req,res)=>{
    res.send("student view api")
})
app.post("/student-insert",(req,res)=>{
    res.send("student insert api")
})
app.listen("8000")