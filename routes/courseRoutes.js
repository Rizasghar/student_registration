import express, { Router } from "express";
import catchAsyncErrors from "../lib/catchAsyncErrors.js";
// import { mySqlConnection } from "../DbConnection.js";
import makeQuery from "../lib/make-query.js";
const route = express.Router();



route.get("/get_all_courses", catchAsyncErrors(
    async (req, res) => {

        let result = await makeQuery('SELECT * FROM courses');
        res.send(result);

    }
))

route.post("/insert_course", catchAsyncErrors(
    async (req, res) => {
        let { name, creditHours } = req.body;

        let result = await makeQuery(`insert into courses(course_name, credit_hours) values( ?, ?)`, [name, creditHours]);
        res.send({ message: `Course ${name} added successfully` });

    }
))

route.delete(`/delete_course`, catchAsyncErrors(
    async (req, res) => {
        let id = req.body.id;

        await makeQuery(`Delete from courses where course_id = ?`, [id]);
        res.send({ message: `course with id # ${id} deleted successfully` })
    }
))

route.put("/update_course", catchAsyncErrors(
    async (req, res) => {
        let { name, creditHours, id } = req.body;

        await makeQuery(`update courses set course_name = ?, credit_hours = ? where course_id = ?`, [name, creditHours, id]);
        res.send({ message: `Course with id # ${id} updated successfully` })

    }
))

route.get("/get_course", catchAsyncErrors(
    async (req, res) => {
        let id = req.body.id;

        let result = await makeQuery('SELECT * FROM courses where course_id = ?', [id])
        res.send(result);
    }
))

export default route; 