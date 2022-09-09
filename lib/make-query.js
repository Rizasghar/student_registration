// const { createConnection } = require("promise-mysql")
import { createConnection } from "promise-mysql"
import * as dotenv from 'dotenv';
dotenv.config();

const mysqlConnection = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TABLE,
}

const makeQuery = (str, replacement) => {
    str = str.trim()
    let wait = false
    if (str.search("SELECT") === 0) {
        wait = true
        mysqlConnection.host = process.env.DB_HOST_READER
    } else {
        mysqlConnection.host = process.env.DB_HOST
    }
    return new Promise((resolve, reject) => {
        let db
        const db_call = () =>
            createConnection(mysqlConnection)
                .then((conn) => {
                    db = conn
                    return db.query(str, replacement)
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
                .finally(() => {
                    db.end()
                })
        wait ? setTimeout(() => db_call(), 50) : db_call()
    })
}

export default makeQuery