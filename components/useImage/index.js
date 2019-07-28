import React, { useState, useMemo, useEffect } from 'react';
import { getImageUrl } from '../../utils';

/**
 * This hook takes in an imagePath and imageSize and uses them to construct the full image url. It also
 * manages the loading status of an image (via the isLoaded property returned from the hook), and indicates 
 * whether an image path was even supplied (via the hasImage property returned -- this could be derived by
 * the component since it has to send the imagePath to the hook anyway, but I have given it a dedicated prop
 * for the sake of clarity). 
 * 
 * With the information returned from this hook a component can determine whether it needs to show a placholder,
 * some sort of loading component, or the image itself, and if it does need to show the image it knows the
 * correct src to pass to it. 
 */
export default function useImage({ imagePath, imageSize }) {

    const imageSrc = useMemo(() => {
        if (!imagePath) return '';
        return getImageUrl(imagePath, imageSize);
    }, [ imagePath, imageSize ]);

    const [ isLoaded, setLoaded ] = useState(false);

    useEffect(() => {
        if (isLoaded) return;
        const img = new Image();
        img.onload = () => {
            setLoaded(true);
        }
        img.src = imageSrc;
    }, [ isLoaded, imageSrc ]);

    return {
        hasImage: Boolean(imagePath),
        imageSrc,
        isLoaded
    };
}