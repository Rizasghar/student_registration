import express from "express";
import studentRoute from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js"
import studentAndCourses from "./routes/studentAndCourses.js";
import bodyParser from "body-parser";
import errorMiddleware from "./lib/error.js"

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", studentRoute);
app.use("/api/courses", courseRoutes);
app.use("/api/register", studentAndCourses)

app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
