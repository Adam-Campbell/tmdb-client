import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import usePrevious from '../usePrevious';

export default function Sentinel({ isLoading, getNextPage }) {

    const [ ref, inView, entry ] = useInView({
        rootMargin: '0px 0px 200px 0px'
    });

    const prevInView = usePrevious(inView);

    useEffect(() => {
        //console.log('Sentinel effect ran');
        if (inView && !prevInView && !isLoading) {
            //console.log('Sentinel effect made it past conditional check');
            getNextPage();
        }
    }, [ inView, prevInView, isLoading, getNextPage ]);

    return <div ref={ref}></div>
}

Sentinel.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    getNextPage: PropTypes.func.isRequired
};