import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors"

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.get("/documents", async (req, res) => { 
  const todos = await prisma.documents.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(todos);
});

app.post("/documents", async (req, res) => {
  const {id, createdAt, description, level, title, category} = req.body
  const todo = await prisma.documents.createMany({
    data: [
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Médica', level: 3 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Educação', level: 2 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Padrão', level: 1 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Médica', level: 3 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Educação', level: 2 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Padrão', level: 1 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Médica', level: 3 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Educação', level: 2 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Padrão', level: 1 },
        { title: 'Tradução de documento médico', description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', category: 'Médica', level: 3 },
    ],
  });

  return res.json(todo);
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.documents.findUnique({
    where: { id },
  });

  return res.json(todo);
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /todos
    GET, PUT, DELETE /todos/:id
  </pre>
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
