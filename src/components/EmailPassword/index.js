import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// styles
import './styles.scss';

// components
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

// redux actions
import { resetPasswordStart, resetUserState } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr,
})

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { resetPasswordSuccess, userErr} = useSelector(mapState);

    const [state, setState] = useState({
        email: '',
        errors: []
    })

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email: state.email }))
    }
    
    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetUserState())
            history.push('/login')
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0 ) {
            setState({
                ...state,
                errors: userErr
            })
        }
    }, [userErr])

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

export default EmailPassword;