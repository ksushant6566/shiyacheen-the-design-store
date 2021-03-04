import React, { useEffect } from 'react';
import './styles.scss';

import Directory from '../../components/Directory';

import Art1 from '../../assets/imgs/Art-1.svg';
import Art2 from '../../assets/imgs/Art-2.svg';
import Art3 from '../../assets/imgs/Art-3.svg';
import { Link } from 'react-router-dom';

const Homepage = props => {

    return (
        <>
            <section className='homepage'>
                <Link to='/search/royal-art'>
                    <Directory
                        img={Art1}
                        head={'Royal Art'}
                        subhead={'Art, that shows your Royal monster'}
                        subhead2={`The Royals gives you the chance to meet your royal self.
                        Get as royal as you want.
                        Get them if you too have a royal monster inside you!`}
                        idx={1}
                    />
                </Link>

                <Link to='/search/originals'>
                    <Directory
                        img={Art2}
                        head={'Originals'}
                        subhead={'Art, that Resonates with you'}
                        subhead2={`The Originals is the artist's pick,
                    It shows how they think, what their view on the world is.
                    Get them if you share the same!`}
                        idx={2}
                    />
                </Link>

                <Link to='/search/alternate-reality'>
                    <Directory
                        img={Art3}
                        head={'Alternate Reality'}
                        subhead={`Art, that let's you peek into other Realities`}
                        subhead2={`The Alternate Reality is the tweaked version of this reality,
                    or maybe actual version of some other reality.what ? what's real, are you real?
                    Get them if you are curious!`}
                        idx={3}
                    />
                </Link>
            </section>
        </>
    )
}

export default Homepage;