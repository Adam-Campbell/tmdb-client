import React from 'react';
import Biography, { truncateBioIfNeeded, formatBio } from './Biography';
import { render, fireEvent } from '../../testUtils';

const mockBio = `Scarlett Johansson, born November 22, 1984, is an American actress, model and singer. She made her film debut in North (1994) and was later nominated for the Independent Spirit Award for Best Female Lead for her performance in Manny &amp; Lo (1996), garnering further acclaim and prominence with roles in The Horse Whisperer (1998) and Ghost World (2001). She shifted to adult roles with her performances in Girl with a Pearl Earring (2003) and Sofia Coppola's Lost in Translation (2003), for which she won a BAFTA award for Best Actress in a Leading Role; both films earned her Golden Globe Award nominations as well.\n\nA role in A Love Song for Bobby Long (2004) earned Johansson her third Golden Globe for Best Actress nomination. Johansson garnered another Golden Globe nomination for Best Supporting Actress with her role in Woody Allen's Match Point (2005). She has played the Marvel comic book character Black Widow/Natasha Romanoff in Iron Man 2 (2010), The Avengers (2012), and Captain America: The Winter Soldier (2014) and is set to reprise the role in Avengers: Age of Ultron (2015). The 2010 Broadway revival of Arthur Miller's A View From the Bridge won Johansson the Tony Award for Best Performance by a Featured Actress in a Play. As a singer, Johansson has released two albums, Anywhere I Lay My Head and Break Up.\n\nJohansson is considered one of Hollywood's modern sex symbols, and has frequently appeared in published lists of the sexiest women in the world, most notably when she was named the "Sexiest Woman Alive" by Esquire magazine in both 2006 and 2013 (the only woman to be chosen for the title twice), and the "Sexiest Celebrity" by Playboy magazine in 2007.\n\nJohansson was born in New York City. Her father, Karsten Johansson, is a Danish-born architect, and her paternal grandfather, Ejner Johansson, was a screenwriter and director. Her mother, Melanie Sloan, a producer, comes from an Ashkenazi Jewish family from the Bronx. Johansson has an older sister, Vanessa, who is an actress; an older brother, Adrian; a twin brother, Hunter (who appeared in the film Manny &amp; Lo with Scarlett); and a half-brother, Christian, from her father's re-marriage.`;


describe('truncateBioIfNeeded', () => {
    test('returns the input bio string unchanged if the shouldTruncate condition is falsey', () => {
        expect(truncateBioIfNeeded(mockBio, false, 180)).toBe(mockBio);
    });

    test('if shouldTruncate is true, it truncates the input string as specified by truncationThreshold', () => {
        const expected = mockBio.slice(0, 177) + '...';
        expect(truncateBioIfNeeded(mockBio, true, 180)).toBe(expected);
    });
});

describe('formatBio', () => {
    test('it should replace any &amp; html entities', () => {
        expect(formatBio('Foo &amp; bar')).toEqual([ 'Foo & bar' ]);
    });
    test('it should split the string on each new line and remove any empty strings that occur as a result', () => {
        const expected = [
            `Scarlett Johansson, born November 22, 1984, is an American actress, model and singer. She made her film debut in North (1994) and was later nominated for the Independent Spirit Award for Best Female Lead for her performance in Manny & Lo (1996), garnering further acclaim and prominence with roles in The Horse Whisperer (1998) and Ghost World (2001). She shifted to adult roles with her performances in Girl with a Pearl Earring (2003) and Sofia Coppola's Lost in Translation (2003), for which she won a BAFTA award for Best Actress in a Leading Role; both films earned her Golden Globe Award nominations as well.`,
            `A role in A Love Song for Bobby Long (2004) earned Johansson her third Golden Globe for Best Actress nomination. Johansson garnered another Golden Globe nomination for Best Supporting Actress with her role in Woody Allen's Match Point (2005). She has played the Marvel comic book character Black Widow/Natasha Romanoff in Iron Man 2 (2010), The Avengers (2012), and Captain America: The Winter Soldier (2014) and is set to reprise the role in Avengers: Age of Ultron (2015). The 2010 Broadway revival of Arthur Miller's A View From the Bridge won Johansson the Tony Award for Best Performance by a Featured Actress in a Play. As a singer, Johansson has released two albums, Anywhere I Lay My Head and Break Up.`,
            `Johansson is considered one of Hollywood's modern sex symbols, and has frequently appeared in published lists of the sexiest women in the world, most notably when she was named the "Sexiest Woman Alive" by Esquire magazine in both 2006 and 2013 (the only woman to be chosen for the title twice), and the "Sexiest Celebrity" by Playboy magazine in 2007.`,
            `Johansson was born in New York City. Her father, Karsten Johansson, is a Danish-born architect, and her paternal grandfather, Ejner Johansson, was a screenwriter and director. Her mother, Melanie Sloan, a producer, comes from an Ashkenazi Jewish family from the Bronx. Johansson has an older sister, Vanessa, who is an actress; an older brother, Adrian; a twin brother, Hunter (who appeared in the film Manny & Lo with Scarlett); and a half-brother, Christian, from her father's re-marriage.`
        ];
        expect(formatBio(mockBio)).toEqual(expected);
    });
});

describe('Biography', () => {

    const truncatedAndFormattedBio = formatBio(
        truncateBioIfNeeded(mockBio, true, 600)
    );

    const expandedAndFormattedBio = formatBio(mockBio);

    test('it renders a truncated biography by default', () => {
        const { getByText, queryByText } = render(<Biography biography={mockBio} />);
        truncatedAndFormattedBio.forEach(paragraph => {
            expect(getByText(paragraph)).toBeInTheDocument();
        });
        expect(queryByText(expandedAndFormattedBio[expandedAndFormattedBio.length - 1])).toBe(null);
    });

    test('when the expand button is clicked the full biography is rendered', () => {
        const { container, getByText } = render(<Biography biography={mockBio} />);
        const expandButton = container.getElementsByTagName('button')[0];
        fireEvent.click(expandButton);
        expandedAndFormattedBio.forEach(paragraph => {
            expect(getByText(paragraph)).toBeInTheDocument();
        });
    });
});