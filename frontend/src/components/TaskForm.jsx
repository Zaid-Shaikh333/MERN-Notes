import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import './Header.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/tasksSlice'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const TaskForm = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState()

    const dispatch = useDispatch()
    const { tasks, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth || {})

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            task,
            description,
        }

        dispatch(createTask(body))
        setTask('')
        setDescription('')
        handleClick()
    }

    return (
        <>
            <div className="notes-form">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<AddIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='expand-form'
                    >
                        Create Your Notes
                    </AccordionSummary>
                    <AccordionDetails>
                        <h5 className='accordion-form-title'>Add Title & Note</h5>
                        <form onSubmit={onSubmit}>
                            <div className="input">
                                <TextField className='textfield'
                                    variant='standard' id='email'
                                    type='text' label='Title' color='success'
                                    onChange={(e) => setTask(e.target.value)}
                                    required />
                            </div>
                            <div className="input">
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder="Start Writing"
                                    className='note-message'
                                    onChange={(e) => setDescription(e.target.value)}
                                    required />
                            </div>
                            <div className="input">
                                <Button type='submit' color='success' variant='contained' size='small'
                                    startIcon={<TextSnippetSharpIcon className='text-snippet' />}>
                                    Add Note
                                </Button>
                            </div>
                        </form>

                    </AccordionDetails>
                </Accordion>
                {(open) && <Stack spacing={2} sx={{ width: '100%' }}>

                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Note added successfully
                        </Alert>
                    </Snackbar>
                </Stack>}
            </div>
        </>
    )
}