const nileBlue = '#1a435d';
const tiber = '#062438';
const pictonBlue = '#43cbe8';
const alizarinCrimson = '#dc1f3b';
const conifer = '#6ee843';
const mountainMeadow = '#23bd4d';
const tahitiGold = '#f58a0b';
const westSide = '#fb8e0f';
const mineShaft = '#222';
const gallery = '#eee';
const alto = '#ddd';
const white = '#fff';
const porcelain = '#eaedee';
const transparentBlack = 'rgba(0,0,0,0.8)';
const transparentGrey = 'rgba(17,17,17,04)';

const spaceBase = 5;

// Works on a scale of 1 to 5, with 1 being the spaceBase, and then each successive
// number being double the number before it, so spaceBase*2, spaceBase*4 etc.
// Inputs will map to outputs like this:
// 0 => 0
// 1 => base * 2^0 = 5px
// 2 => base * 2^1 = 10px
// 3 => base * 2^2 = 20px
// 4 => base * 2^3 = 40px
// 5 => base * 2^4 = 80px
function getPx(exp) {
    if (exp === 0) return exp;
    const normalizedExp = Math.min(Math.max(0, exp - 1), 4);
    return `${Math.pow(2, normalizedExp) * spaceBase}px`;
}

function getSpacing(...args) {
    return args.slice(0,4)
               .map(num => getPx(num))
               .join(' ');
}


const theme = {
    colors: {
        primary: pictonBlue,
        complimentary: tiber,
        black: mineShaft,
        white,
        success: mountainMeadow,
        warning: alizarinCrimson,
        info: westSide,
        uiPrimary: porcelain,
        uiSecondary: alto,
        overlayStrong: transparentBlack,
        overlayMild: transparentGrey
    },
    fontStacks: {
        heading: ({ useLight } = {}) => `
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            color: ${useLight ? white : mineShaft};
        `,
        body: ({ useLight } = {}) => `
            font-family: 'Fira Sans', sans-serif;
            font-weight: 300;
            color: ${useLight ? white : mineShaft};
        `,
        bodyBold: ({ useLight } = {}) => `
            font-family: 'Fira Sans', sans-serif;
            font-weight: 600;
            color: ${useLight ? white : mineShaft};
        `
    },
    fontSizes: {
        body: {
            xs: '0.75rem',
            sm: '0.85rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem'
        },
        heading: {
            sm: '1.25rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '2.5rem'
        }
    },
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    getSpacing,
};

export default theme;