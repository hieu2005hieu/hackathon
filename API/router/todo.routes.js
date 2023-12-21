const express = require("express");
const router = express.Router();
const data = require("../src/MSQL")
router.get("/job", async (req, res) => {
    let result = await data.getJob();
    res.send(result)
})
router.post("/job/add", async (req, res) => {
    const { name } = req.body
    data.ADDJob(name);
    let user = await data.getJob();
    res.json(user)
})
router.delete("/job/delete/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params
    data.DELETEJob(id);
    let user = await data.getJob();
    res.json(user)
})
router.put("/job/edit/:id", async (req, res) => {
    console.log("chay vao editttttt")
    console.log(req.params);
    const { id } = req.params
    const { name, status } = req.body
    data.EditJob(id, name, status);
    let user = await data.getJob();
    res.json(user)
})
module.exports = router;