const router = require("express").Router();
const auth = require("../middleware/auth");
const createCrud = require("../utils/crudFactory");
const Team = require("../models/Team");
const crud = createCrud(Team, "");

router.get("/", crud.getAll);
router.get("/:id", crud.getOne);
router.post("/", auth, crud.create);
router.put("/:id", auth, crud.update);
router.delete("/:id", auth, crud.remove);

module.exports = router;
