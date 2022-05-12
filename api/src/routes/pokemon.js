const router = require("express").Router();

const {
  postPoke,
  getAllPoke,
  getOnePoke,
} = require("../controllers/pokemon");



router.get("/", getAllPoke);

router.get("/:id", getOnePoke);

router.post("/", postPoke);


module.exports= router;