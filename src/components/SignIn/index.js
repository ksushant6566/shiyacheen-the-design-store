import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.scss';

import { auth, signInWithGoogle } from '../../firebase/utils';

// components
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

const SignIn = props => {

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {

            await auth.signInWithEmailAndPassword(state.email, state.password);
            setState({
                email: '',
                password: '',
            })
            props.history.push('/');

        } catch (err) {
            console.log(err);
        }

    }
    return (
        <AuthWrapper 
            headline="login"
        >
            <div className='formwrap'>
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type='email'
                        name='email'
                        value={state.email}
                        onChange={handleChange}
                        placeholder='Email'
                    />

                    <FormInput
                        type='password'
                        name='password'
                        value={state.password}
                        onChange={handleChange}
                        placeholder='Password'
                    />

                    <Button type='submit' >
                        Login
                    </Button>

                    <div className='socialSignIn'>
                        <div className='row'>
                            <Button onClick={signInWithGoogle}>
                                SignIn with Google
                            </Button>
                        </div>
                    </div>

                    <div className='links'>
                        <Link to='recovery' >
                            Forgot password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}
        
export default withRouter(SignIn);