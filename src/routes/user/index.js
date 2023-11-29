const express = require("express");
const getAll = require("./getAll");
const getById = require("./getById");
const deleteUser = require("./delete");
const update = require("./update");
const post = require("./post");
const router = express.Router();
const validator = require('../../helpers/validator');
const { authenticateToken } = require("../../middleware/auth.middleware");

router.post("/create", validator('body',post.rule), post.handler)
router.get("/getById", validator('query',getById.rule), getById.handler)
router.get("/getAll", validator('query',getAll.rule), getAll.handler)
router.delete("/delete", validator('query',deleteUser.rule), deleteUser.handler)
router.patch("/update", validator('body',update.rule), update.handler)

module.exports = router