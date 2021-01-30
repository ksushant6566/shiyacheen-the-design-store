import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// styles
import './styles.scss';

// components
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

// redux actions
import { resetAllAuthForms, resetPassword } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
    resetPasswordError: user.resetPasswordError,
    resetPasswordSuccess: user.resetPasswordSuccess
})

const EmailPassword = props => {

    const dispatch = useDispatch();
    const { resetPasswordError, resetPasswordSuccess } = useSelector(mapState);

    const [state, setState] = useState({
        email: '',
        errors: []
    })

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({ email: state.email }))
    }
    
    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetAllAuthForms)
            props.history.push('/login')
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0 ) {
            setState({
                ...state,
                errors: resetPasswordError
            })
        }
    }, [resetPasswordError])

    const handleChange = e => {
        setState({
            [e.target.name]: e.target.value,
            errors: []
        })
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