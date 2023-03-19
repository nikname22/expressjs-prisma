import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/documents", async (req, res) => {
  const todos = await prisma.documents.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const {id, createdAt, description, level, title} = req.body
  const todo = await prisma.documents.create({
    data: {
      id, 
      createdAt, 
      description, 
      level, 
      title
    },
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
