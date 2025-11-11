import { Router } from "express";
import { createNote, deleteNote, downloadAllNotes, getAllNotes, getNote, updateNote } from "../controllers/note.controller";

const router = Router();

router.get('/', getAllNotes);
router.get('/download', downloadAllNotes);
router.post('/', createNote);

router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;