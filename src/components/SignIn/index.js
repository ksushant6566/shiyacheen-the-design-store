import React, { useState } from 'react';
import './styles.scss';

import { auth, signInWithGoogle } from '../../firebase/utils';

// components
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';

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

        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className='signin'>
            <div className='wrap'>
                <h2>
                    Login
                </h2>

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
                    </form>
                </div>
            </div>
        </div>
    )
}
        
export default SignIn;