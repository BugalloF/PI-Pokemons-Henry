const  router = require('express').Router();

const { saveAllTypes } = require("../controllers/type");

router.get("/", saveAllTypes);

module.exports = router;