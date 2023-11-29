const express = require("express");
const getAll = require("./getAll");
const getById = require("./getById");
const deleteUser = require("./delete");
const post = require("./post");
const router = express.Router();
const validator = require('../../helpers/validator');

router.post("/create", validator('body',post.rule), post.create)
router.get("/getById", validator('query',getById.rule), getById.handler)
router.get("/getAll", validator('query',getAll.rule), getAll.getAll)
router.delete("/delete", validator('query',deleteUser.rule), deleteUser.handler)

module.exports = router