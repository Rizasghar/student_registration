import express from "express";
import catchAsyncErrors from "../lib/catchAsyncErrors.js";
// import { mySqlConnection } from "../DbConnection.js";
import makeQuery from "../lib/make-query.js";
const route = express.Router();


route.post("/register_in_course", catchAsyncErrors(
    async (req, res) => {
        let { sid, sname, cid, cname } = req.body;

        let stuCount = await makeQuery(`select registeredStudents from courses where course_id = ?`, [cid]);
        let countC = stuCount[0].registeredStudents;
        console.log(countC)
        if (countC >= 50) {
            res.send({ mesage: "You cannot enrolled, registration for this course is full" })
            res.end()

        }


        let courseCount = await makeQuery(`select registeredCourses from students where student_id = ?`, [sid])
        let countS = courseCount[0].registeredStudents;
        if (countS >= 5) {
            res.send({ mesage: "already enrolled in five courses, cannot add any course" })
            res.end();
        }


        await makeQuery("insert into StudentandCourses(student_id, student_name, course_id, course_name) values (?, ?, ?, ?)", [sid, sname, cid, cname]);
        res.send({ message: `Student ${sname} is registered in course ${cname} successfully` });

    }
))

route.get("/student_with_specfic_course", catchAsyncErrors(
    async (req, res) => {
        let { cid } = req.body;

        let result = await makeQuery("SELECT * FROM StudentandCourses where course_id = ?", [cid]);
        res.send(result)
    }
))

route.get("/courses_with_specfic_student", catchAsyncErrors(
    async (req, res) => {
        let { sid } = req.body;

        let result = await makeQuery("SELECT DISTINCT course_name FROM StudentandCourses where student_id = ?", [sid])
        res.send(result);

    }
))

route.get("/courses_with_no_students", catchAsyncErrors(
    async (req, res) => {


        let result = await makeQuery("SELECT course_name FROM courses where registeredStudents = 0");
        res.send(result);

    }
))

route.get("/student_with_no_course", catchAsyncErrors(
    async (req, res) => {

        let result = await makeQuery("SELECT student_name FROM students where registeredCourses = 0")
        res.send(result);

    }
))

export default route;