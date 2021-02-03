import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';

// components
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

// redux actions
import { signUpUserStart } from '../../redux/User/user.actions';

// utils
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
})

const SignUp = props => {

    const { currentUser, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

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
        if(currentUser) {
            setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            err: [''],
        })
        history.push('/');
    }
    }, [currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0) {
            setState({
                ...state,
                err: userErr,
            })
        }
    }, [userErr])

    const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(signUpUserStart(state))
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

export default SignUp;