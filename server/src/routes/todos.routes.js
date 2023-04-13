import express from 'express';
import {
	addImageToTodo,
	addTodo,
	deleteTodoById,
	getTodo,
	getTodos,
	updateTodoById
} from "../controllers/todo.controller.js";
import {upload} from "./multerConfig.js";


const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo)
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodoById);
router.put('/todos/:id', updateTodoById);
router.put('/todos/:id/images', upload.single('image'), addImageToTodo);

// router.get('/*', (req, res) => {
// 	// res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

export default router;
