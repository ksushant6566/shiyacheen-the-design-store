import React from 'react';

import './styles.scss'

const Directory = ({ img, head, subhead, subhead2, idx }) => {

    const dir = idx%2 == 0 ? 'row-reverse' : 'row';

    return (
        <div className='directory'>
            <div className='wrap' style={{flexDirection: dir}}>
                <img src={img} />
                <div>
                    <h1>
                        # {head}
                    </h1>
                    <h3>
                        {subhead}
                    </h3>
                    <p>
                        {subhead2}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Directory;