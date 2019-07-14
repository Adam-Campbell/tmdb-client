import React, { useState } from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../../Api';
import MinimalHeader from '../../components/MinimalHeader';
import SubNav from '../../components/SubNav';
import { getShowSubNavData, getImageUrl, imageSizeConstants } from '../../utils';
import { Row } from '../../components/Layout';
import ListViewHeader from '../../components/ListViewHeader';
import ListBox from '../../components/ListBox';
import GalleryModal from '../../components/GalleryModal';

import { fetchShow } from '../../actions';
import { getShowData } from '../../reducers/showReducer';
import { connect } from 'react-redux';


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



function Images({ id, title, posterPath, posters, backdrops }) {
    const [ currentImageType, setImageType ] = useState(imageTypes[0]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);
    const showSubNavData = getShowSubNavData(id);
    return (
        <div>
            <MinimalHeader 
                imagePath={posterPath}
                name={title}
                backHref={`/show?id=${id}`}
                backAs={`/show/${id}`}
            />
            <SubNav navData={showSubNavData} />
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
                        <PosterThumb 
                            key={poster.file_path}
                            src={getImageUrl(poster.file_path, imageSizeConstants.w500)}
                            onClick={() => {
                                setImageIndex(index);
                                setIsModalOpen(true);
                            }}
                        />
                    )) : backdrops.map((backdrop, index) => (
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
                images={currentImageType.value === 'poster' ? posters : backdrops}
            />
        </div>
    );
}

Images.getInitialProps = async ({ query, req, store }) => {
    const id = parseInt(query.id);
    await store.dispatch(fetchShow(id));
    return {};
};

function mapState(state) {
    const s = getShowData(state);
    return {
        id: s.id,
        title: s.name,
        posterPath: s.poster_path,
        posters: s.images.posters,
        backdrops: s.images.backdrops
    }
}

export default connect(mapState)(Images);
