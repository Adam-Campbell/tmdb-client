const nileBlue = '#1a435d';
const pictonBlue = '#43cbe8';
const alizarinCrimson = '#dc1f3b';
const conifer = '#6ee843';
const tahitiGold = '#f58a0b';
const mineShaft = '#222';
const gallery = '#eee';
const alto = '#ddd';
const white = '#fff';
const porcelain = '#eaedee';

const spaceBase = 5;

// Works on a scale of 1 to 5, with 1 being the spaceBase, and then each successive
// number being double the number before it, so spaceBase*2, spaceBase*4 etc.
function getPx(exp) {
    const normalizedExp = Math.min(Math.max(0, exp - 1), 4);
    return `${Math.pow(2, normalizedExp) * spaceBase}px`;
}


function getSpacing(...args) {
    if (args.length === 1) {
        const [ all ] = args;
        return getPx(all);
    } else if (args.length === 2) {
        const [ tb, lr ] = args;
        return `${getPx(tb)} ${getPx(lr)}`;
    } else if (args.length === 4) {
        const [ t, r, b, l ] = args;
        return `${getPx(t)} ${getPx(r)} ${getPx(b)} ${getPx(l)}`;
    } else {
        return null;
    }
}

const theme = {
    colors: {
        primary: pictonBlue,
        complimentary: nileBlue,
        black: mineShaft,
        white,
        success: conifer,
        warning: alizarinCrimson,
        info: tahitiGold,
        uiPrimary: porcelain,
        uiSecondary: alto
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
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    getSpacing,
};

export default theme;