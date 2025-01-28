const images = import.meta.glob('./**/*.{webp,png,jpg,svg}', { eager: true });

const Images = Object.keys(images).reduce((acc, filePath) => {
    const fileName = filePath.split('/').pop().split('.')[0];
    acc[fileName] = images[filePath].default || images[filePath];
    return acc;
}, {});

export default Images;