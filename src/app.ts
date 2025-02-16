import express from "express";

import usersAPI from "./components/users/usersAPI.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use('/api/users', usersAPI);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;