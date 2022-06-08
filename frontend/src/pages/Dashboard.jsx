import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TaskForm } from '../components/TaskForm'
import { reset, getTask } from '../features/tasks/tasksSlice'
import { Notes } from '../components/Notes'
import './css/dashboard.css'

const DashBoard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { tasks,  isError, message } = useSelector((state) => state.tasks)
    const [data, setData] = useState({})

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        else {
            setData(JSON.parse(localStorage.getItem('user')))
        }
        dispatch(getTask())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    return (
        <>
            <div className="dashboard">
                <TaskForm />
                <div className="display-tasks">
                    {tasks.map((task) => {
                        return <Notes key={task._id} task={task}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default DashBoard