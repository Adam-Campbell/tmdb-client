import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { getImageUrl, imageSizeConstants } from '../../utils';
import {
    ModalInner, 
    GalleryImage,
    ControlsContainer,
    ArrowButton,
    BackArrow,
    ForwardArrow
} from './styledElements';

function calculateImageWidth(img) {
    const isLandscape = img.aspect_ratio > 1;
    if (isLandscape) {
        return img.width <= 1280 ? 'original' : imageSizeConstants.w1280;
    } else {
        return imageSizeConstants.width  <= 780 ? 'original' : imageSizeConstants.w780;
    }
}

export function GalleryModal({ isOpen, handleClose, images, currentImageIndex, setImageIndex }) {
    const currentImage = images[currentImageIndex];
    const imageWidth = calculateImageWidth(currentImage);

    return (
        <ReactModal
            isOpen={isOpen}
            overlayClassName={{
                base: 'centered-modal__overlay',
                afterOpen: 'centered-modal__overlay--after-open',
                beforeClose: 'centered-modal__overlay--before-close'
            }}
            className={{
                base: 'gallery-modal__content-container',
                afterOpen: 'gallery-modal__content-container--after-open',
                beforeClose: 'gallery-modal__content-container--before-close'
            }}
            closeTimeoutMS={200}
            shouldCloseOnEscape={true}
            onRequestClose={handleClose}
        >
            <ModalInner>
                <a
                    href={getImageUrl(currentImage.file_path, 'original')}
                    target="_blank"
                >
                    <GalleryImage
                        src={getImageUrl(currentImage.file_path, imageWidth)}
                    />
                </a>
                <ControlsContainer>
                    <ArrowButton
                        onClick={() => setImageIndex(prev => {
                            return prev > 0 ? prev - 1 : images.length - 1;
                        })}
                    >
                        <BackArrow />
                    </ArrowButton>
                    <ArrowButton
                        onClick={() => setImageIndex(prev => {
                            return prev < images.length - 1 ? prev + 1 : 0;
                        })}
                    >
                        <ForwardArrow />
                    </ArrowButton>
                </ControlsContainer>
            </ModalInner>
        </ReactModal>
    )
}

GalleryModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    currentImageIndex: PropTypes.number.isRequired,
    setImageIndex: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        aspect_ratio: PropTypes.number,
        file_path: PropTypes.string, 
        height: PropTypes.number,
        width: PropTypes.number
    })).isRequired
};