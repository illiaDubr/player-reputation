import React, {useRef, useLayoutEffect, useState, useEffect} from 'react';

const AnimatedDiv = ({children, duration, easing}) => {
    const containerRef = useRef(null);
    const [animating, setAnimating] = useState(false);

    useLayoutEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        // Запоминаем текущую высоту контейнера
        const startHeight = node.clientHeight;

        // Устанавливаем явную высоту, чтобы избавиться от auto
        node.style.height = startHeight + 'px';

        // Если содержимое изменилось, через requestAnimationFrame измерим новую высоту
        requestAnimationFrame(() => {
            // Измеряем новую высоту
            const newHeight = node.scrollHeight;
            if (startHeight !== newHeight) {
                setAnimating(true);
                // Устанавливаем transition для плавного изменения высоты
                node.style.transition = `height ${duration}ms ${easing}`;
                // Устанавливаем новую высоту
                node.style.height = newHeight + 'px';
            }
        });
    }, [children, duration, easing]);

    // После окончания перехода сбросим высоту в auto
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const handleTransitionEnd = () => {
            if (animating) {
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

    return (
        <div ref={containerRef} style={{overflow: 'hidden'}}>
            {children}
        </div>
    );
};

export default AnimatedDiv;