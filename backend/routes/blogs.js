const router = require("express").Router();
const auth = require("../middleware/auth");
const createCrud = require("../utils/crudFactory");
const Blog = require("../models/Blog");
const crud = createCrud(Blog, "");

router.get("/", crud.getAll);
router.get("/:id", crud.getOne);
router.post("/", auth, crud.create);
router.put("/:id", auth, crud.update);
router.delete("/:id", auth, crud.remove);

module.exports = router;
