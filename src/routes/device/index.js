const express = require("express");
const getAll = require("./getAll");
const getById = require("./getById");
const deleteUser = require("./delete");
const post = require("./post");
const lockApis = require('./lock');
const router = express.Router();
const validator = require('../../helpers/validator');

router.post("/create", validator('body',post.rule), post.handler)
router.get("/getById", validator('query',getById.rule), getById.handler)
router.get("/getAll", validator('query',getAll.rule), getAll.handler)
router.delete("/delete", validator('query',deleteUser.rule), deleteUser.handler)

router.get("/getLockStatus", validator('body',lockApis.rule), lockApis.getLockStatus)
router.get("/updateLockStatusBy", validator('body',lockApis.updateLockStatusByValidationRule), lockApis.updateLockStatusBy)
router.get("/updateLockStatus", validator('body',lockApis.rule), lockApis.updateLockStatus)
module.exports = router