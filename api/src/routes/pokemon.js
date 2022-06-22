const router = require("express").Router();

const {
  postPoke,
  getAllPoke,
  getOnePoke,
  deletePoke,
} = require("../controllers/pokemon");



router.get("/", getAllPoke);

router.get("/:id", getOnePoke);

router.delete('/:id',deletePoke)

router.post("/", postPoke);


module.exports= router;