import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';

// components
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

// redux actions
import { signInUser, signInWithGoogle, resetAllAuthForms } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const SignIn = props => {

    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();

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

    useEffect(() => {
        if(signInSuccess) {
            setState({
                email: '',
                password: '',
            })
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signInSuccess])

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(signInUser({ email: state.email, password: state.password }));
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle())
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
                            <Button onClick={handleGoogleSignIn}>
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