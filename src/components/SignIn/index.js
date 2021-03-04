import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';

// components
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

// redux actions
import { emailSignInStart, googleSignInStart, } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = () => {

    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [processing, setProcessing] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        })
    }

    useEffect(() => {
        if(currentUser) {
            setState({
                email: '',
                password: '',
            })
            setProcessing(false)
            history.push('/');
        }
    }, [currentUser])

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);
        dispatch(emailSignInStart({ email: state.email, password: state.password }));
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
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

                    <Button type='submit' processing={processing} >
                        Login
                    </Button>

                    <div className='socialSignIn'>
                        <div className='row'>
                            <Button onClick={handleGoogleSignIn} >
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
        
export default SignIn;