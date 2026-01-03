const express = require("express");
const app = express();

app.use(express.json());

let students = [];
let id = 1;

// CREATE
app.post("/students", (req, res) => {
  const student = { id: id++, ...req.body };
  students.push(student);
  res.status(201).json(student);
});

// READ
app.get("/students", (req, res) => {
  res.json(students);
});

// UPDATE
app.put("/students/:id", (req, res) => {
  const sid = parseInt(req.params.id);
  students = students.map(s =>
    s.id === sid ? { id: sid, ...req.body } : s
  );
  res.json({ message: "Updated" });
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const sid = parseInt(req.params.id);
  students = students.filter(s => s.id !== sid);
  res.json({ message: "Deleted" });
});
app.get("/",(req,res)=> {
    res.send("server is running successfully");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
