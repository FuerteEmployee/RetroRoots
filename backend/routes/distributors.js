const router = require("express").Router();
const auth = require("../middleware/auth");
const createCrud = require("../utils/crudFactory");
const Distributor = require("../models/Distributor");
const crud = createCrud(Distributor, "");

router.get("/", crud.getAll);
router.get("/:id", crud.getOne);
router.post("/", auth, crud.create);
router.put("/:id", auth, crud.update);
router.delete("/:id", auth, crud.remove);

module.exports = router;
