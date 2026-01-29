// api/index.ts
import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import subjectsRouter from "../src/routes/subjects.js";
import usersRouter from "../src/routes/users.js";
import classesRouter from "../src/routes/classes.js";
import departmentsRouter from "../src/routes/departments.js";
import statsRouter from "../src/routes/stats.js";
import enrollmentsRouter from "../src/routes/enrollments.js";
import { auth } from "../src/lib/auth.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/api/subjects", subjectsRouter);
app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/enrollments", enrollmentsRouter);

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// NO app.listen() — Vercel handles this
export default app;
