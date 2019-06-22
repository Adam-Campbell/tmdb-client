import React from 'react';
import { getShowDetails } from '../Api';
import MediaHeader from '../components/MediaHeader';
import { 
    MainCol, 
    SidebarCol, 
    TwoColLayoutContainer,
    TwoColLayoutRow
} from '../components/Layout';
import InlineCardRow from '../components/InlineCardRow';

function Show({ results }) {
    return (
        <div>
            <MediaHeader 
                backdropPath={results.backdrop_path}
                posterPath={results.poster_path}
                id={results.id}
                title={results.name}
                averageRating={results.vote_average}
                overview={results.overview}
                createdBy={results.created_by}
            />
            <TwoColLayoutContainer>
                <TwoColLayoutRow>
                    <MainCol>
                        <InlineCardRow 
                            title="Top Cast"
                            cardsData={results.credits.cast}
                            cardType="person"
                            linkText="See full cast & crew"
                            linkDestinationAs="/foo"
                            linkDestinationHref="/foo"
                        />
                        <InlineCardRow 
                            title="Recommended Shows"
                            cardsData={results.recommendations.results}
                            cardType="show"
                            linkText="See all recommended shows"
                            linkDestinationAs="/foo"
                            linkDestinationHref="/foo"
                        />
                        <InlineCardRow 
                            title="Similar Shows"
                            cardsData={results.similar.results}
                            cardType="show"
                            linkText="See all similar shows"
                            linkDestinationAs="/foo"
                            linkDestinationHref="/foo"
                        />
                    </MainCol>
                    <SidebarCol>

                    </SidebarCol>
                </TwoColLayoutRow>
            </TwoColLayoutContainer>
        </div>
    );
}

Show.getInitialProps = async ({ query, req }) => {
    const { id } = query;
    const results = await getShowDetails(id);
    const serverInfo = req ? { isDevice: req.isDevice } : {};
    return {
        results,
        ...serverInfo
    };
};

export default Show;
