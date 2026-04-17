const router = require("express").Router();
const auth = require("../middleware/auth");
const Enquiry = require("../models/Enquiry");
const createCrud = require("../utils/crudFactory");
const crud = createCrud(Enquiry, "productId");

router.get("/", crud.getAll);
router.get("/export/csv", auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate("productId", "name").lean();
    const header = "Name,Email,Phone,Type,Product,Message,Read,Replied,Date\n";
    const rows = enquiries.map(e =>
      `"${e.name}","${e.email}","${e.phone || ""}","${e.type}","${e.productName || ""}","${(e.message || "").replace(/"/g, '""')}",${e.isRead},${e.isReplied},${e.createdAt}`
    ).join("\n");
    res.header("Content-Type", "text/csv");
    res.attachment("enquiries.csv");
    res.send(header + rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
});
router.get("/:id", crud.getOne);
router.post("/", crud.create);
router.put("/:id", auth, crud.update);
router.delete("/:id", auth, crud.remove);

module.exports = router;
