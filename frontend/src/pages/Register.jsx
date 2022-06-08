import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { register, reset} from '../features/auth/authSlice';
import { Spinner} from '../components/Spinner';


const Register = () => {
    const [ name, setName] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")


    const onSubmit = (e) => {
        e.preventDefault()

        if(!password)
        {
            console.log("No Password")
        }
        else{
            const userData = {
                name,
                email,
                password,
            }
           
            dispatch(register(userData))
        }
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth || {})

    useEffect(() => {
        
        if(isError)
        {
            //alert(message.message)
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{message.message}</Alert>
            </Stack>
        }
        
        if(isSuccess || user)
        {
            console.log("Inside IsSuccess");
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">This is a success alert — check it out!</Alert>
            </Stack>
            navigate('/')
        }

        dispatch(reset())

    }, [ user, isSuccess, isError, message, navigate, dispatch])


    if(isLoading)
    {
        return <Spinner/>
    }
    
    return(
        <div className="register">
            <div className="form">
                <h3>Register to Create <EditIcon/> </h3>
                <form onSubmit={onSubmit}>
                    <div className="input">
                        <AccountCircleIcon className="name-icon"/>
                        <TextField className='textfield'
                        variant='standard' id='name' 
                        label='Name' 
                        value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="input">
                        <AlternateEmailIcon className="email-icon"/>
                        <TextField className='textfield' 
                        variant='standard' id='email' 
                        type='email' label='Email'
                        value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input">
                        <LockOpenIcon className="password-icon"/>
                        <TextField className='textfield' 
                        variant='standard' id='password' 
                        type='password' label='Password' 
                        value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="input">
                        <Button type='submit' color='primary' variant='contained' size='small'>Register</Button>
                    </div>
                </form>
                <p className="no-account">
                    Already Signed Up? <Link to='/login'className='register-link'>Login here</Link> 
                </p>
            </div>
        </div>
    )
}

export default Register