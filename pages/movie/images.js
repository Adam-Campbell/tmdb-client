import React, { useState } from 'react';
import styled from 'styled-components';
import { getMovieDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData, getImageUrl, imageSizeConstants } from '../../utils';
import { Row } from '../../components/Layout';
import ListViewHeader from '../../components/ListViewHeader';
import ListBox from '../../components/ListBox';
import GalleryModal from '../../components/GalleryModal';

import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

/*

    Hold internal component state `imageType` which will be either 'poster' or 'backdrop'. This will control 
    the type of image being rendered. 

    Map over the images and render an image for each one. The image will need to be clickable eventually to
    open the modal, for now don't worry about this.

    In order to achieve the desired layout, the images will have left and right (probably top and bottom too)
    margins of 20px, and all of the images will sit inside a container that has -20px left and right margins. 
    This will prevent unwanted indentation at the left and right bounds of the layout. 

*/

const DropdownContainer = styled.div`
    width: 220px;
    margin-left: auto;
`;

const ThumbsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
`;

const PosterThumb = styled.img`
    margin: 10px;
    width: calc(50% - 20px);
    object-fit: cover;
    object-position: center;
    @media(min-width: 550px) {
        width: calc(33.33333% - 20px);
    }
    @media(min-width: 768px) {
        width: calc(25% - 20px);
    }
    @media(min-width: 960px) {
        width: calc(20% - 20px);
    }
`;

const BackdropThumb = styled.img`
    margin: 10px;
    width: calc(100% - 20px);
    object-fit: cover;
    object-position: center;
    @media(min-width: 600px) {
        width: calc(50% - 20px);
    }
    @media(min-width: 768px) {
        width: calc(33.33333% - 20px);
    }
    
`;

const imageTypes = [
    { value: 'poster', name: 'Poster' },
    { value: 'backdrop', name: 'Backdrop' } 
];



function Images({ results }) {
    const [ currentImageType, setImageType ] = useState(imageTypes[0]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);
    const movieSubNavData = getMovieSubNavData(results.id);
    return (
        <div>
            <MinimalHeader 
                imagePath={results.poster_path}
                name={results.title}
                backHref={`/movie?id=${results.id}`}
                backAs={`/movie/${results.id}`}
            />
            <SubNav navData={movieSubNavData} />
            <ListViewHeader title="Images">
                <DropdownContainer>
                    <ListBox 
                        items={imageTypes}
                        currentValue={currentImageType}
                        setValue={setImageType}
                        shouldBuffer={false}
                        shouldInlineLabel={true}
                        labelText="Image type: "
                    />
                </DropdownContainer>
            </ListViewHeader>
            <Row>
                <ThumbsContainer>
                    {currentImageType.value === 'poster' ? results.images.posters.map((poster, index) => (
                        <PosterThumb 
                            key={poster.file_path}
                            src={getImageUrl(poster.file_path, imageSizeConstants.w500)}
                            onClick={() => {
                                setImageIndex(index);
                                setIsModalOpen(true);
                            }}
                        />
                    )) : results.images.backdrops.map((backdrop, index) => (
                        <BackdropThumb 
                            key={backdrop.file_path}
                            src={getImageUrl(backdrop.file_path, imageSizeConstants.w780)}
                            onClick={() => {
                                setImageIndex(index);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
                </ThumbsContainer>
            </Row>
            <GalleryModal 
                isOpen={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                currentImageIndex={currentImageIndex}
                setImageIndex={setImageIndex}
                images={currentImageType.value === 'poster' ? results.images.posters : results.images.backdrops}
            />
        </div>
    );
}

Images.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchMovie(id));
    return {};
};

const mapState = (state) => ({
    results: getMovieData(state)
});

export default connect(mapState)(Images);
