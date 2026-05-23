
const express = require("express");
const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController.js");
const { protect, authorize } = require("../middleware/auth.js");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("admin"), addStudent)
  .get(protect, authorize("admin", "teacher", "parent"), getStudents);
router
  .route("/:id")
  .get(
    protect,
    authorize("admin", "teacher", "parent", "student"),
    getStudentById,
  )
  .put(protect, authorize("admin"), updateStudent)
  .delete(protect, authorize("admin"), deleteStudent);

module.exports = router;
