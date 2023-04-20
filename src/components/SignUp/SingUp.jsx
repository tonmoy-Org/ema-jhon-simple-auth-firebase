import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';


const SingUp = () => {
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const {createUser} = useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password, name);
        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error =>{
           setError(error);
           console.log(error.message)
        })
    }
    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className='lg'>
                <div>
                    <h2 className='banner-log'>Sign Up</h2>
                </div>
                <div className='form-container'>
                    <label htmlFor="">Name</label>
                    <input className='email' type="text" name="name" required />
                </div>
                <div className='form-container'>
                    <label htmlFor="">Email</label>
                    <input className='email' type="email" name="email" required />
                </div>
                <div className='form-container'>
                    <label htmlFor="">Password</label>
                    <input className='password' type={show ? "text" : "password"} name="password" required />
                    <p onClick={()=> setShow(!show)}><small>
                        {
                            show ? <span>Hide Password</span> : <span>Show Password</span>
                        }
                        </small></p>
                </div>
                <div>
                    <p>Already have an account <Link to="/login">LogIn</Link> </p>
                </div>
                <div>
                    <button className='login-btn'>Sign Up</button>
                </div>
                <div>
                    <p>{error.message}</p>
                </div>
            </form>
        </div>
    );
};

export default SingUp;