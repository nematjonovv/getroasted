import multer, { Multer } from "multer"

const fifeMb = 5 * 1024 * 1024;
const tenMb = 10 * 1024 * 1024;
const storage = multer.memoryStorage()
export const uploadAvatar = multer({
  storage,
  limits: { fileSize: fifeMb },
  fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG and PNG images are allowed"));
    }
    cb(null, true);
  },
});


export const uploadPortfolio = multer({
  storage,
  limits: { fileSize: fifeMb },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Faqat rasm yuklash mumkin"))
    }
  }
})
