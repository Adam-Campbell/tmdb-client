import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { getPersonDetails } from '../../Api';
import SubNav from '../../components/SubNav';
import MinimalHeader from '../../components/MinimalHeader';
import ListViewHeader from '../../components/ListViewHeader';
import { Row } from '../../components/Layout';
import { getPersonSubNavData, getImageUrl, imageSizeConstants } from '../../utils';
import GalleryModal from '../../components/GalleryModal';
import SmartImage from '../../components/SmartImage';
import { fetchPerson } from '../../actions';
import { getPersonData } from '../../reducers/personReducer';
import { connect } from 'react-redux';


const ThumbsContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
`;

const Thumb = styled(SmartImage)`
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

function Images({ id, name, profilePath, profileImages }) {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentImageIndex, setImageIndex ] = useState(0);
    const personSubNavData  = useMemo(() => {
        return getPersonSubNavData(id);
    }, [ id ]);
    return (
        <div>
            <MinimalHeader 
                imagePath={profilePath}
                name={name}
                backHref={`/person?id=${id}`}
                backAs={`/person/${id}`}
            />
            <SubNav navData={personSubNavData} alignCenter={true} />
            <ListViewHeader title="Profile Images" />
            <Row>
                <ThumbsContainer>
                    {profileImages.map((image, index) => (
                        <Thumb 
                            key={image.file_path}
                            imagePath={image.file_path}
                            imageSize={imageSizeConstants.w500}
                            alt={name}
                            handleClick={() => {
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
