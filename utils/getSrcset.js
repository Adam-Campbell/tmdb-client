const safeSizes = [
   '45',
   '92',
   '154',
   '185',
   '300',
   '342',
   '500',
   '780',
   '1280' 
];

export function getSrcset(imagePath) {
    const root = 'http://image.tmdb.org/t/p/';
    return safeSizes.reduce((acc, size) => acc + `${root}w${size}${imagePath}, `, '');
}
