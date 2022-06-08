import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './css/login.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BookmarksRoundedSharpIcon from '@mui/icons-material/BookmarksRounded';
import { Link } from 'react-router-dom';
import { login, reset} from '../features/auth/authSlice';
import { Spinner} from '../components/Spinner';

const Login = () => {
    
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth || {})

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }
       
        dispatch(login(userData))
    }

    useEffect(() => {
        
        if(isError)
        {
            alert(message.message)
            console.log(message);
        }
        
        if(isSuccess || user)
        {
            alert("Login Successful")
            navigate('/')
        }

        dispatch(reset())

    }, [ user, isSuccess, isError, message, navigate, dispatch])

    if(isLoading)
    {
        return <Spinner/>
    }

    return (
        <div className="login">
            <div className="form">
                <h3>Login to View <BookmarksRoundedSharpIcon/> </h3>
                <form onSubmit={onSubmit}>
                    <div className="input">
                        <AlternateEmailIcon className="email-icon"/>
                        <TextField className='textfield' 
                        variant='standard' id='email' 
                        type='email' label='Email' color='error' 
                        value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input">
                        <LockOpenIcon className="password-icon"/>
                        <TextField className='textfield' 
                        variant='standard' id='password' 
                        type='password' label='Password' color='error' 
                        value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="input">
                        <Button type='submit' color='error' variant='contained' size='small'>Login</Button>
                    </div>
                </form>
                <p className="no-account">
                    Don't have an Account? <Link to='/register' className='register-link'>Register here</Link> 
                </p>
            </div>
        </div>
    )
}

export default Login