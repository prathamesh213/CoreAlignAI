const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");


const getTask = asyncHandler(  async (req, res) => {
      const tasks = await Task.find({user: req.user._id});
      res.status(200).json({ tasks });
});

const setTask = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!req.body){
        res.status(400)
        throw new Error('Please provide data');
    }
    
    const task = await Task.create({text: req.body.text})
    res.status(201).json({ task });


});

const updateTask = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Task ${req.params.id}
    updated.` });
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(404)
        throw new Error('Task not found');
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json({ updatedTask });

});

const deleteTask = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id}
    deleted.` });
     
    const task = Task.findById(req.params.id);
    if(!task){
        res.status(404)
        throw new Error('Task not found');
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task removed' });

});
   

module.exports = { getTask, setTask, updateTask, deleteTask };