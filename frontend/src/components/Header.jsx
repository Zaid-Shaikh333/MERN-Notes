import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

import Button from '@mui/material/Button';
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import './Header.css';


const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const Logout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <>
            <div className="navbar">
                <ul className="nav-items">
                    { user ? 
                    (
                        <>
                            <li>
                                <h6 className='welcome-user'>Welcome {user.name}</h6>
                            </li>
                            <li>
                                <Button color="inherit" variant="text" size="small" onClick={Logout}>
                                    <LogoutSharpIcon className="logout-icon"/>
                                        Logout
                                </Button>
                            </li>
                        </>
                    ) : 
                    (
                    <>
                        <li>
                            <Button color="inherit" variant="text" size="small">
                                <Link to='/login' className='link'>
                                    <LockOpenSharpIcon className="login-icon"/>
                                    Login
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button color="inherit" variant="text" size="small">
                                <Link to='/register' className='link'>
                                    <PersonAddAltOutlinedIcon className="reg-icon"/>
                                    Register
                                </Link>
                            </Button>
                        </li>
                    </>
                    )}
                    
                </ul>
            </div>
        </>
    )
}

export default Header