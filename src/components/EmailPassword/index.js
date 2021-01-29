import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// styles
import './styles.scss';

// utils
import { auth } from '../../firebase/utils'

// components
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const EmailPassword = props => {

    const [state, setState] = useState({
        email: '',
        errors: []
    })

    const handleChange = e => {
        setState({
            [e.target.name]: e.target.value,
            errors: []
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                url: 'http://localhost:3000/login',
            }

            await auth.sendPasswordResetEmail(state.email, config)
                .then(() => {
                    props.history.push('/login')
                })
                .catch(() => {
                    const err = ['Email not found!']
                    setState({
                        ...state,
                        errors: err,
                    })
                })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthWrapper headline='Reset Password' >
            <div className='formwrap'>
                {state.errors.length > 0 && (
                    state.errors.map((err , idx) => {
                        return (
                            <h6 key={idx} >{err}</h6>
                        )
                    })
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        type="email"
                        name="email"
                        value={state.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(EmailPassword);