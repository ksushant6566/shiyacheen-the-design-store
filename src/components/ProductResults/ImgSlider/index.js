import { Slide } from '@material-ui/core';
import React, { useEffect, useState } from 'react';


const ImgSlider = ({ imgs, width, height, speed, manual }) => {


    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!manual) {
            const interval = setInterval(() => {
                setIdx(idx => (idx + 1) % imgs.length);
            }, speed)

            return () => {
                clearInterval(interval);
            }
        }
    }, []);

    const slideR = () => {
        setIdx(idx => (idx + 1) % imgs.length);
    }
    const slideL = () => {
        setIdx(idx => idx == 0 ? imgs.length - 1 : idx - 1);
    }

    return (
        <>
            {manual && (
            <div className="imgPreviews">
                {imgs.map((img, idx) => (
                    <div 
                        className="imgPreview" 
                        key={idx} 
                        onClick={() => setIdx(idx)}
                        style={{
                            cursor: 'pointer'
                        }}
                        >
                        <img src={img} alt={`productImg-${idx}`} />
                    </div>
                ))
                }
            </div>)}
            <div className="imgslider"
                style={{
                    overflow: "hidden",
                    height: `${height}px`,
                    width: `${width}px`,
                    position: 'relative',
                    display: 'flex'
                }}>
                {manual && (
                    <div
                        style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "3rem",
                            background: 'rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            zIndex: '1',
                            top: '48%',
                            left: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => slideL()}>
                        {`<`}
                    </div>
                )}
                <div style={{
                    position: 'absolute',
                    // top: '5px',
                    left: `-${idx * width}px`,
                    width: `${width * imgs.length}px`,
                    transition: 'all 0.5s'
                }}>{
                        imgs.map((img, i) => (
                            <img
                                key={i}
                                style={{
                                    display: "inline-block",
                                    height: `${height}px`,
                                    width: `${width}px`,
                                }}
                                src={img}
                                alt="picture"
                            />
                        ))
                    }</div>
                {manual && (
                    <div
                        style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "3rem",
                            background: 'rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            zIndex: '1',
                            top: '48%',
                            left: 'calc(100% - 6.5rem)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => slideR()}>
                        {`>`}
                    </div>
                )}
            </div>
        </>
    )
}

export default ImgSlider;