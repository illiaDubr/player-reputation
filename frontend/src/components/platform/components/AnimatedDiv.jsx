import { useRef, useLayoutEffect } from 'react';
import { useSpring } from '@react-spring/web';

const useAnimatedHeight = ({ duration = 500, config: userConfig } = {}) => {
    const ref = useRef(null);

    // Инициализация spring'а. Изначальное значение height можно задать нулевым или 'auto' (но анимировать "auto" нельзя, поэтому работаем с числами)
    const [springProps, api] = useSpring(() => ({
        height: 0,
        config: { duration, ...(userConfig || {}) }
    }));

    // При монтировании измеряем начальную высоту и запускаем анимацию
    useLayoutEffect(() => {
        if (!ref.current) return;
        const initialHeight = ref.current.getBoundingClientRect().height;
        console.log("Начальная высота:", initialHeight);
        // Запускаем анимацию к измеренной высоте (в пикселях)
        api.start({ height: initialHeight });
    }, [api]);

    // При каждом изменении содержимого (без явной зависимости children можно использовать вызов хука без зависимостей,
    // но если содержимое динамическое, можно добавить зависимость, например, ключ или children)
    useLayoutEffect(() => {
        if (!ref.current) return;
        const measuredHeight = ref.current.scrollHeight;
        const currentHeight = ref.current.getBoundingClientRect().height;
        // Если высота изменилась, запускаем анимацию и логируем новое значение
        if (currentHeight !== measuredHeight) {
            console.log("Новая высота:", measuredHeight);
            api.start({ height: measuredHeight });
        }
    }); // Если нужно, можно добавить зависимости, чтобы эффект срабатывал только при изменении содержимого

    return { ref, springProps };
};

export default useAnimatedHeight;