import React from 'react';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';


const HomepageLayout = props => {

    return (
        <div className='fullHeight'>
            <Header {...props} />
            {props.children}
            <Footer />
        </div>
    )
}

export default HomepageLayout;