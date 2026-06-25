const express = require("express");

const router = express.Router();

const supportController = require("../controllers/personalsupport.controller");

router.post("/", supportController.createSupport);

router.get("/", supportController.getAllSupport);

router.get("/:id", supportController.getSupportById);

router.put("/:id", supportController.updateSupport);

router.delete("/:id", supportController.deleteSupport);

module.exports = router;