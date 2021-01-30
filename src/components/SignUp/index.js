import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';

// components
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

// redux actions
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions';

// utils
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = props => {

    const { signUpSuccess, signUpError } = useSelector(mapState);

    const dispatch = useDispatch();
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        err: [''],
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
            err: [],
        })
    }

    useEffect(() => {
        if(signUpSuccess) {
            setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            err: [''],
        })
        dispatch(resetAllAuthForms());
        props.history.push('/');
    }
    }, [signUpSuccess]);

    useEffect(() => {
        if(Array.isArray(signUpError) && signUpError.length > 0) {
            setState({
                ...state,
                err: signUpError,
            })
        }
    }, [signUpError])

    const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(signUpUser(state))
    }

    return (
        <AuthWrapper
            headline='signup'
        >
            {
                state.err.length > 0 && (
                    state.err.map((er, i) => {
                        return (
                            <h6 key={i}>{er}</h6>
                        )
                    })
                )
            }
            <form onSubmit={handleFormSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={state.displayName}
                    placeholder="Full Name"
                    onChange={handleChange}
                />
                <FormInput
                    type="email"
                    name="email"
                    value={state.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={state.password}
                    placeholder="Password"
                    onChange={handleChange}
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <Button type='submit'>
                    Register
                    </Button>
            </form>
        </AuthWrapper>
    );
}

export default withRouter(SignUp);