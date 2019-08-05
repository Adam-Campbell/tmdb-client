import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import usePrevious from '../usePrevious';
import { useInView } from 'react-intersection-observer';

export default function Sentinel({ name, handleEnter }) {
    const [ ref, inView, entry ] = useInView({
        rootMargin: '0px 0px 200px 0px'
    });

    const prevInView = usePrevious(inView);

    useEffect(() => {
        // Explicitly check that prevInView is false rather than just falsey, because it will start
        // of undefined on the initial load, we don't want to trigger the effect logic if it goes
        // from undefined (read: unitialized) straight to true; only if it goes from false to true. 
        if (inView && prevInView === false) {
            console.log(`${name} has entered the viewport`);
            handleEnter();
        }
    }, [ inView, prevInView, name, handleEnter ]);

    return <div ref={ref}></div>
}

Sentinel.propTypes = {
    name: PropTypes.string,
    handleEnter: PropTypes.func
};
