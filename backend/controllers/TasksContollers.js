const Tasks = require('../model/tasksModel')
const asyncHandler = require('express-async-handler')

// route GET api/tasks
// private
const getTasks = asyncHandler(async (req,res) => {
    const todos = await Tasks.find({ user: req.user.id})

    res.status(200).json(todos)
})

// route POST api/tasks
// private
 const setTasks = asyncHandler(async (req,res) => {
    //console.log(req.body)

    if(!req.body.task && !req.body.description){
        //res.status(400).json({ message : "Please add a Task name."})
        res.status(400)
        throw new Error('Please add a Task with Description')
    }
    const newTask = await Tasks.create({
        task: req.body.task,
        description: req.body.description,
        user: req.user.id
    })
    res.status(201).json(newTask)
 })

// route PUT api/tasks/:id
// private
const updateTask = asyncHandler(async (req,res) => {
    const getTask = await Tasks.findById(req.params.id);
    if(!getTask)
    {
        res.status(400)
        throw new Error('Task not found')
    }
    const updateTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updateTask)
})

// route DELETE api/tasks/:id
// private
const deleteTask = asyncHandler(async (req,res) => {
    const getTask = await Tasks.findById(req.params.id);

    if(!getTask)
    {
        res.status(400)
        throw new Error('Task not found')
    }
    await Tasks.findByIdAndRemove(req.params.id)
    res.status(200).json()
})

module.exports = {
    getTasks,
    setTasks,
    updateTask,
    deleteTask
}