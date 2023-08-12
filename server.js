import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//mongodb connected
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

//routers
import adminRouter from "./src/router/AdminRouter.js";
app.use("/api/v1/admin", adminRouter);

app.use("*", (req, res) => {
  res.json({
    message: "you do not have access here",
  });
});

//error handling

app.use((error, req, res, next) => {
  console.log(error);
  const errorCode = error.errorCode || 404;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is running at http://localhost:${PORT}`);
});
