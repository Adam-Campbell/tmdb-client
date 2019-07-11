import React, { useState } from 'react';
import styled from 'styled-components';
import { getPersonDetails } from '../../Api';
import SubNav from '../../components/SubNav';
import MinimalHeader from '../../components/MinimalHeader';
import ListViewHeader from '../../components/ListViewHeader';
import { Row } from '../../components/Layout';
import { getPersonSubNavData, getImageUrl, imageSizeConstants } from '../../utils';
import GalleryModal from '../../components/GalleryModal';

import { fetchPerson } from '../../actions';
import { getPersonData } from '../../reducers/personReducer';
import { connect } from 'react-redux';

const ThumbsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
`;

const Thumb = styled.img`
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

function Images({ id, name, profilePath, profileImages }) {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);
    const personSubNavData  = getPersonSubNavData(id);
    return (
        <div>
            <MinimalHeader 
                imagePath={profilePath}
                name={name}
                backHref={`/person?id=${id}`}
                backAs={`/person/${id}`}
            />
            <SubNav navData={personSubNavData} />
            <ListViewHeader title="Profile Images" />
            <Row>
                <ThumbsContainer>
                    {profileImages.map((image, index) => (
                        <Thumb 
                            key={image.file_path}
                            src={getImageUrl(image.file_path, imageSizeConstants.w500)}
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
                images={profileImages}
                currentImageIndex={currentImageIndex}
                setImageIndex={setImageIndex}
            />
        </div>
    );
}

Images.getInitialProps = async ({ query, req, store }) => {
    const { id } = query;
    await store.dispatch(fetchPerson(id));
    return {};
}

function mapState(state) {
    const p = getPersonData(state);
    return {
        id: p.id,
        name: p.name,
        profilePath: p.profile_path,
        profileImages: p.images.profiles
    };
}

export default connect(mapState)(Images);
