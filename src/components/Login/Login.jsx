import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
const Login = () => {
    const [error, setError] = useState('');
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const from = location.state?.from?.pathname || '/';
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);
        setError('');
        if (password != confirm) {
            setError("Password didn't match");
            return
        }
        else if (password.length < 6) {
            setError("Password must be 6 character longer")
            return
        }
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                console.log(from)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }
    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className='lg'>
                <div>
                    <h2 className='banner-log'>Login</h2>
                </div>
                <div className='form-container'>
                    <label htmlFor="">Email</label>
                    <input className='email' type="email" name="email" required />
                </div>
                <div className='form-container'>
                    <label htmlFor="">Password</label>
                    <input className='password' type="password" name="password" required />
                </div>
                <div className='form-container'>
                    <label htmlFor="">Confirm Password</label>
                    <input className='password' type="password" name="confirm" required />
                </div>
                <div>
                    <p>New at ema jhon? <Link to="/signUp">Sign Up</Link> </p>
                </div>
                <div>
                    <button className='login-btn'>Login</button>
                </div>
                <div>
                    <p>{error}</p>
                </div>
            </form>
        </div>
    );
};

export default Login;