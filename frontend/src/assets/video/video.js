// video.js

// Импортируем все файлы с расширением mp4 из текущей директории и вложенных папок
const videos = import.meta.glob('./**/*.{mp4}', { eager: true });

// Собираем объект Video, где ключ – это имя файла (без расширения),
// а значение – модуль (либо его default, либо сам модуль)
const Video = Object.keys(videos).reduce((acc, filePath) => {
    const fileName = filePath.split('/').pop().split('.')[0];
    acc[fileName] = videos[filePath].default || videos[filePath];
    return acc;
}, {});

// Выводим в консоль объект, чтобы проверить, что файлы импортировались
console.log("Loaded videos:", Video);

export default Video;