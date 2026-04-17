const router = require("express").Router();
const auth = require("../middleware/auth");
const { upload, cloudinary } = require("../config/cloudinary");

router.post("/image", auth, upload.single("file"), (req, res) => {
  res.json({ url: req.file.path, publicId: req.file.filename });
});

router.post("/images", auth, upload.array("files", 10), (req, res) => {
  const files = req.files.map(f => ({ url: f.path, publicId: f.filename }));
  res.json(files);
});

router.delete("/:publicId", auth, async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ message: "File deleted from Cloudinary" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
