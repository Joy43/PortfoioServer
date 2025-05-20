import express from "express";
import cors from "cors";

import route from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});
app.use("/api", route);
app.use(globalErrorHandler);
app.use(notFound);

export default app;