import React, {Component } from 'react';
import './styles.scss';

import { signInWithGoogle } from '../../firebase/utils';

// components
import Button from '../forms/Button';

class SignIn extends Component {

    handleSubmit = async e => {
        e.preventDefault();
    }
    
    render() {
        return (
            <div className='signin'>
                <div className='wrap'>
                    <h2>
                        Login
                    </h2>
    
                    <div className='formwrap'>
                        <form onSubmit = {this.handleSubmit}>
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
    }
        
        export default SignIn;