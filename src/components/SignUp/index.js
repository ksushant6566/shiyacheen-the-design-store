import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

// components
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

// utils
import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';

const SignUp = props => {

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

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = state;

        const errs = [];
        if (password !== confirmPassword) {
            errs.push('passwords don\'t match!')
            setState({
                ...state,
                err: errs
            });
            return;
        }
        if (state.displayName.length < 3) {
            errs.push('name should be atleast 3 characters long');
            setState({
                ...state,
                err: errs
            });
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });
            setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                err: [''],
            })
            props.history.push('/');

        } catch (err) {
            console.log(err);
        }

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