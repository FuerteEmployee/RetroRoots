const router = require("express").Router();
const auth = require("../middleware/auth");
const createCrud = require("../utils/crudFactory");
const Product = require("../models/Product");
const crud = createCrud(Product, "category");

router.get("/", crud.getAll);
router.get("/:id", crud.getOne);
router.post("/", auth, crud.create);
router.put("/:id", auth, crud.update);
router.delete("/:id", auth, crud.remove);

module.exports = router;
