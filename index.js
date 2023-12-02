// Fehér Aladár modulzáró

import express from "express";
import booksRouter from "./routers/books.router.js";
import usersRouter from "./routers/users.router.js";
import logRequest from "./middlewares/logger.js";

const app = express();

app.use(express.json());
app.use(logRequest);

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
