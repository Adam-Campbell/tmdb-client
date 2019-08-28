import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../../components/MinimalHeader';
import SubNav from '../../../components/SubNav';
import { getShowSubNavData, getImageUrl, imageSizeConstants } from '../../../utils';
import { Row } from '../../../components/Layout';
import ListViewHeader from '../../../components/ListViewHeader';
import ListBox from '../../../components/ListBox';
import GalleryModal from '../../../components/GalleryModal';
import SmartImage from '../../../components/SmartImage';
import { fetchShow } from '../../../actions';
import { getShowData } from '../../../reducers/showReducer';
import { connect } from 'react-redux';
import { getInitialShowProps } from './';
import withErrorHandling from '../../../components/withErrorHandling';
import { MediaSeo } from '../../../components/Seo';

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



function Images({ id, title, posterPath, backdropPath, posters, backdrops }) {
    const [ currentImageType, setImageType ] = useState(imageTypes[0]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);
    const showSubNavData = useMemo(() => {
        return getShowSubNavData(id);
    }, [ id ]);
    return (
        <>
            <MediaSeo uniqueTitleSegment="Images" />
            <MinimalHeader 
                imagePath={posterPath}
                backdropPath={backdropPath}
                name={title}
                backHref="/show/[id]"
                backAs={`/show/${id}`}
            />
            <SubNav 
                navData={showSubNavData} 
                navLabel="Navigation links for pages related to the current TV show"
            />
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

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        backdropPath: s.backdrop_path,
        posters: s.images.posters,
        backdrops: s.images.backdrops
    }
}

const ImagesPage = withErrorHandling(
    connect(mapState)(Images)
);

ImagesPage.getInitialProps = getInitialShowProps;

export default ImagesPage;
