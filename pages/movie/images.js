import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getMovieSubNavData, getImageUrl, imageSizeConstants } from '../../utils';
import { Row } from '../../components/Layout';
import ListViewHeader from '../../components/ListViewHeader';
import ListBox from '../../components/ListBox';
import GalleryModal from '../../components/GalleryModal';
import SmartImage from '../../components/SmartImage';
import { fetchMovie } from '../../actions';
import { getMovieData } from '../../reducers/movieReducer';
import { connect } from 'react-redux';

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



function Images({ id, title, posterPath, posters, backdrops }) {
    const [ currentImageType, setImageType ] = useState(imageTypes[0]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);

    const movieSubNavData = useMemo(() => {
        return getMovieSubNavData(id);
    }, [ id ]);

    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/movie?id=${id}`}
                backAs={`/movie/${id}`}
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
                                imageSize={imageSizeConstants.w780}
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
        </div>
    );
}

Images.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchMovie(id));
    return {};
};

function mapState(state) {
    const m = getMovieData(state);
    return {
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        posters: m.images.posters,
        backdrops: m.images.backdrops
    };
}

export default connect(mapState)(Images);
