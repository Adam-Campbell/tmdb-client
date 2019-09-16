import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal/lib/components/Modal';
import { getImageUrl, imageSizeConstants } from '../../utils';
import { ArrowAltCirleLeft, ArrowAltCircleRight } from 'styled-icons/fa-solid';
import { ArrowAltCircleLeft } from 'styled-icons/fa-solid/ArrowAltCircleLeft/ArrowAltCircleLeft';

const ModalInner = styled.div`
    min-height: 300px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
`;


const GalleryImage = styled.img`
    max-height: calc(100vh - 100px);
    max-width: calc(100vw - 60px);
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding-top: ${({ theme }) => theme.getSpacing(2)};
`;

const ArrowButton = styled.button`
    color: ${({ theme }) => theme.colors.black};
    margin: ${({ theme }) => theme.getSpacing(0, 3)};
    border: solid 2px transparent;
    background: none;
    padding: 3px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: 0;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const BackArrow = styled(ArrowAltCircleLeft)`
    width: 25px;
    max-height: 25px;
`;

const ForwardArrow = styled(ArrowAltCircleRight)`
    width: 25px;
    max-height: 25px;
`;

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