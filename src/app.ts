import express from "express";

import usersAPI from "./components/users/usersAPI.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authAPI from "./components/auth/authAPI.js"

const app = express();

app.use(express.json());

app.use('/api/users', usersAPI);
app.use('/auth', authAPI)
app.use(notFoundHandler);

app.use(errorHandler);

export default app;