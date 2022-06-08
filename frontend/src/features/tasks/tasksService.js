import axios from 'axios';
const TASK_URL = 'http://localhost:8000/api/tasks'

const createTask = async (taskData, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(TASK_URL, taskData, config)
    return response.data
}

const getTask = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(TASK_URL, config)
    return response.data
}

const tasksService = {
    createTask,
    getTask
}
export default tasksService