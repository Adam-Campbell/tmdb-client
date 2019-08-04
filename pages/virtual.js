import React, { 
    useState,
    useEffect,
    useLayoutEffect,
    useReducer,
    Component 
} from 'react';
import styled from 'styled-components';
import { Row } from '../components/Layout';
import { useInView } from 'react-intersection-observer';
import usePrevious from '../components/usePrevious';
import VirtualList from '../components/VirtualList';

export default function Virtual(props) {
    return (
        <div>
            <VirtualList />
        </div>
    );
}
