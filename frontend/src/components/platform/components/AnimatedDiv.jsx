import { useRef, useLayoutEffect, useEffect, useState } from 'react';

const useAnimatedHeight = ({ duration = 500, easing = 'ease-in-out' } = {}) => {
    const ref = useRef(null);
    const [animating, setAnimating] = useState(false);

    useLayoutEffect(() => {
        const node = ref.current;
        if (!node) {
            console.log("useAnimatedHeight: ref.current is null");
            return;
        }

        // Запоминаем текущую (начальную) высоту
        const startHeight = node.clientHeight;
        console.log("useAnimatedHeight: startHeight =", startHeight);
        // Устанавливаем явную высоту вместо auto
        node.style.height = startHeight + 'px';

        // В следующем кадре измеряем новую высоту
        requestAnimationFrame(() => {
            const newHeight = node.scrollHeight;
            console.log("useAnimatedHeight: newHeight =", newHeight);
            if (startHeight !== newHeight) {
                console.log(`useAnimatedHeight: Starting animation from ${startHeight}px to ${newHeight}px`);
                setAnimating(true);
                // Задаём плавный переход для высоты
                node.style.transition = `height ${duration}ms ${easing}`;
                // Устанавливаем новую высоту, которая будет анимирована
                node.style.height = newHeight + 'px';
            } else {
                console.log("useAnimatedHeight: Height did not change, no animation needed");
            }
        });
    }, [duration, easing]);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const handleTransitionEnd = () => {
            console.log("useAnimatedHeight: Transition ended");
            if (animating) {
                // Сброс высоты в auto, чтобы блок мог динамически менять высоту в дальнейшем
                node.style.height = 'auto';
                node.style.transition = 'none';
                setAnimating(false);
                console.log("useAnimatedHeight: Height reset to auto and transition removed");
            }
        };
        node.addEventListener('transitionend', handleTransitionEnd);
        console.log("useAnimatedHeight: Added transitionend event listener");

        return () => {
            node.removeEventListener('transitionend', handleTransitionEnd);
            console.log("useAnimatedHeight: Removed transitionend event listener");
        };
    }, [animating]);

    return ref;
};

export default useAnimatedHeight;