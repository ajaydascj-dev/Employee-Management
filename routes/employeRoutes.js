const express = require("express");
const router = express.Router();
const {
  viewHome,
  addUser,
  logOut,
  getAllemployee,
  postAvatar,
  getAnEmp,
  editEmp,
  deleteEmp,
  viewEmp,
  searchEmp,
} = require("../controllers/employee");

const { secRoute } = require("../middlewares/secureRoute");
const { upload } = require("../middlewares/imageUpload");

router.route("/employee").get(secRoute, getAllemployee);
router.route("/dashboard").get(secRoute, viewHome)
.post(searchEmp);
router.route("/view").get(viewEmp);
router.route("/addUser").post(upload, addUser);
router.route("/logout").post(logOut);
router.route("/:id/avatar").post(upload, postAvatar);
router.route("/employee/:id").get(getAnEmp)
.put(editEmp)
.delete(deleteEmp);

module.exports = router;
