import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//mongodb connected
connectDB();

//routers
import registerRouter from "./src/routers/adminRouter.js";
import { connectDB } from "./src/config/dbConfig.js";
app.use("/api/v1/admin", registerRouter);

app.use("/", (res, req) => {
  res.json({
    message: "you do not have access here",
  });
});

//error handling

app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 404;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error, req, res, next) => {
  error
    ? console.log(error)
    : console.log(`Your server is running at http://localhost:${PORT}`);
});
