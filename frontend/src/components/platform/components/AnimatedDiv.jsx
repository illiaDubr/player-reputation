import { useRef, useLayoutEffect, useEffect, useState } from 'react';

const useAnimatedHeight = ({ duration, easing } = {}) => {
    const ref = useRef(null);
    const [animating, setAnimating] = useState(false);

    useLayoutEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Запоминаем текущую (начальную) высоту
        const startHeight = node.clientHeight;
        // Устанавливаем явную высоту вместо auto
        node.style.height = startHeight + 'px';

        // В следующем кадре измеряем новую высоту, основываясь на изменившемся содержимом
        requestAnimationFrame(() => {
            const newHeight = node.scrollHeight;
            if (startHeight !== newHeight) {
                setAnimating(true);
                node.style.transition = `height ${duration}ms ${easing}`;
                // Устанавливаем новую высоту
                node.style.height = newHeight + 'px';
            }
        });
    }, [duration, easing]);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const handleTransitionEnd = () => {
            if (animating) {
                // Сброс высоты в auto, чтобы контейнер мог адаптироваться к дальнейшим изменениям
                node.style.height = 'auto';
                node.style.transition = 'none';
                setAnimating(false);
            }
        };
        node.addEventListener('transitionend', handleTransitionEnd);
        return () => {
            node.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [animating]);

    return ref;
};

export default useAnimatedHeight;