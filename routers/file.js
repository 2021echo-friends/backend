import { Router } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { range } from "lodash";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../files/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.get("/", (req, res) => {
  const options = {};
  const { resource } = req.query;
  const filePath = "../files/" + resource;
  //file stream?
});
router.post("/", upload.single("file"), (req, res) => {
  res.json(req.file.filename);
});

export default router;
