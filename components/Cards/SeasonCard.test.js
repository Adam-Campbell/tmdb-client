import React from 'react';
import { SeasonCard } from './SeasonCard';
import { render } from '../../testUtils';

beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
        constructor() {}
        observe() { return null }
        unobserve() { return null }
        disconnect() { return null }
    }
});

test('it renders an image with the appropriate alt text', () => {
    const { getByAltText } = render(<SeasonCard 
        name="Season 1"
        posterPath="/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg"
        airDate="2011-04-17"
        episodeCount={10}
        overview="Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring."
        showId={1399}
        seasonNumber={1}
    />);
    expect(getByAltText('Season 1')).toBeInTheDocument();
});

test('it renders the release year and episode count', () => {
    const { getByText } = render(<SeasonCard 
        name="Season 1"
        posterPath="/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg"
        airDate="2011-04-17"
        episodeCount={10}
        overview="Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring."
        showId={1399}
        seasonNumber={1}
    />);
    expect(getByText('2011 | 10 episodes')).toBeInTheDocument();
});

test('it renders the season overview', () => {
    const { getByText } = render(<SeasonCard 
        name="Season 1"
        posterPath="/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg"
        airDate="2011-04-17"
        episodeCount={10}
        overview="Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring."
        showId={1399}
        seasonNumber={1}
    />);
    expect(getByText(
        "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that prot..."
    )).toBeInTheDocument();
});