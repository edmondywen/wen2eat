import React from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css'

export const LogoutButton = (reset) => 
{
    return(<button onClick = {reset}>log out </button>)
}

export default LogoutButton; 