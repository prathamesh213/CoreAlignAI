const express = require('express');
const router = express.Router();

const {getTask, setTask, updateTask, deleteTask} = require('../Controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',( req,  getTask) => {
    res.send('<h1>Wassup! 👋</h1>')
});
router.post('/', setTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);


module.exports = router;