const express = require("express");
const { getAllNotes, postANotes, updateAnote, deleteAnote, getNoteById } = require("../controllers/notesController");


const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getNoteById);
router.post("/", postANotes)
router.put("/:id",updateAnote)
router.delete("/:id", deleteAnote)



module.exports = router;