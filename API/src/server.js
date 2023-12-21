const express = require("express");
const app = express();
const cors = require("cors")
const body_parser = require("body-parser")
const todoRouter = require("../router/todo.routes.js");
app.use(cors());
app.use(body_parser.json())

app.use(body_parser.urlencoded({
    extended: true
}))
app.use("/todoList", todoRouter);

app.listen(8080, () => {
    console.log("da chay vao server");
})