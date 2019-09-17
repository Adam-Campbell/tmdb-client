import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { 
    getMovieSubNavData, 
    getShowSubNavData, 
    imageSizeConstants 
} from '../../utils';
import SmartImage from '../SmartImage';
import { MediaSeo } from '../Seo';
import MinimalHeader from '../MinimalHeader';
import SubNav from '../SubNav';
import TitleBlock from '../TitleBlock';
import ListBox from '../ListBox';
import { Row } from '../Layout';
import GalleryModal from '../GalleryModal';

const DropdownContainer = styled.div`
    width: 220px;
    margin-left: auto;
`;

const ThumbsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
`;

const PosterThumbContainer = styled.div`
    margin: 5px;
    width: calc(50% - 10px);
    @media(min-width: 550px) {
        width: calc(33.33333% - 10px);
    }
    @media(min-width: 768px) {
        width: calc(25% - 10px);
    }
    @media(min-width: 960px) {
        width: calc(20% - 10px);
    }
`;

const PosterThumb = styled(SmartImage)`
    width: 100%;
    padding-bottom: 150%;
`;

const BackdropThumbContainer = styled.div`
    margin: 5px;
    width: calc(100% - 10px);
    @media(min-width: 600px) {
        width: calc(50% - 10px);
    }
    @media(min-width: 768px) {
        width: calc(33.33333% - 10px);
    }
`;

const BackdropThumb = styled(SmartImage)`
    width: 100%;
    padding-bottom: 56.25%;
`;

const imageTypes = [
    { value: 'poster', name: 'Poster' },
    { value: 'backdrop', name: 'Backdrop' } 
];

export function MediaGalleryView({ 
    id, 
    title, 
    posterPath, 
    backdropPath, 
    posters, 
    backdrops, 
    isMovie 
}) {

    const [ currentImageType, setImageType ] = useState(imageTypes[0]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);

    const subNavData = useMemo(() => {
        return isMovie ? getMovieSubNavData(id) : getShowSubNavData(id);
    }, [ id, isMovie ]);

    return (
        <>
            <MediaSeo isMovie={isMovie} uniqueTitleSegment="Images" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref={isMovie ? '/movie/[id]' : '/show/[id]'}
                backAs={isMovie ? `/movie/${id}` : `/show/${id}`}
            />
            <SubNav 
                navData={subNavData}
                navLabel={
                    `Navigation links for pages related to the current ${isMovie ? 'movie' : 'TV show'}`
                }
            />
            <TitleBlock title="Images" headingTag="h2">
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
            </TitleBlock>
            <Row>
                <ThumbsContainer>
                    {currentImageType.value === 'poster' ? posters.map((poster, index) => (
                        <PosterThumbContainer key={poster.file_path}>
                            <PosterThumb 
                                imagePath={poster.file_path}
                                imageSize={imageSizeConstants.w500}
                                alt={title}
                                handleClick={() => {
                                    setImageIndex(index);
                                    setIsModalOpen(true);
                                }}
                            />
                        </PosterThumbContainer>
                    )) : backdrops.map((backdrop, index) => (
                        <BackdropThumbContainer key={backdrop.file_path}>
                            <BackdropThumb 
                                imagePath={backdrop.file_path}
                                imageSize={imageSizeConstants.w500}
                                alt={title}
                                isLandscape={true}
                                handleClick={() => {
                                    setImageIndex(index);
                                    setIsModalOpen(true);
                                }}
                            />
                        </BackdropThumbContainer>
                    ))}
                </ThumbsContainer>
            </Row>
            <GalleryModal 
                isOpen={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                currentImageIndex={currentImageIndex}
                setImageIndex={setImageIndex}
                images={currentImageType.value === 'poster' ? posters : backdrops}
            />
        </>
    );
}

MediaGalleryView.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    backdropPath: PropTypes.string.isRequired,
    posters: PropTypes.arrayOf(PropTypes.object).isRequired,
    backdrops: PropTypes.arrayOf(PropTypes.object).isRequired,
    isMovie: PropTypes.bool.isRequired
};