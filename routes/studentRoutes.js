import express from "express";
import makeQuery from "../lib/make-query.js";
import catchAsyncErrors from "../lib/catchAsyncErrors.js";

const route = express.Router();

route.get("/get_all_students", catchAsyncErrors(async (req, res, next) => {

    let result = await makeQuery(`SELECT * FROM students`)
    return res.send(result)

}))

route.post("/insert_student", catchAsyncErrors(
    async (req, res) => {
        let { name, email, fname } = req.body;

        await makeQuery(`insert into students(student_name, student_email, father_name) values( ?, ?, ?)`, [name, email, fname])
        res.send({ message: "user Added" })
    }
))



route.delete(`/delete_student`, catchAsyncErrors(
    async (req, res) => {
        let { id } = req.body;

        await makeQuery(`Delete from students where student_id = ?`, [id])
        res.send({ message: `Student with id ${id} deleted scuuessfully` })

    }
))

route.put("/update_student", catchAsyncErrors(
    async (req, res) => {
        let { name, email, fname, id } = req.body;

        await makeQuery(`update students set student_name = ?, student_email = ?, father_name = ? where student_id = ?`, [name, email, fname, id])
        res.send({ message: `Student with ${id} is updated successfully` })


    }
))
route.get("/get_student", catchAsyncErrors(
    async (req, res) => {
        let { id } = req.body;

        try {
            let result = await makeQuery(`SELECT * FROM students where student_id = ?`, [id]);
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }
))

export default route; 