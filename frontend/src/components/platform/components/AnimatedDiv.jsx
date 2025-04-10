import { useRef, useLayoutEffect, useState } from 'react';
import { useSpring } from '@react-spring/web';

const useAnimatedHeight = (deps = [], { duration = 500 } = {}) => {
    const ref = useRef(null);
    // Предыдущее измерение высоты
    const [prevHeight, setPrevHeight] = useState(0);
    // Инициализация spring-а с начальным значением высоты 0
    const [springProps, api] = useSpring(() => ({
        height: 0,
        config: { duration }
    }));

    useLayoutEffect(() => {
        if (!ref.current) return;

        // Для корректного измерения сбрасываем текущую высоту на 'auto'
        ref.current.style.height = 'auto';
        // Измеряем новую высоту через scrollHeight (всего содержимого)
        const newHeight = ref.current.scrollHeight;
        console.log("Новая измеренная высота:", newHeight);

        // Если высота изменилась, запускаем анимацию
        if (newHeight !== prevHeight) {
            console.log(`Анимация: переход от ${prevHeight}px до ${newHeight}px`);
            setPrevHeight(newHeight);
            api.start({
                height: newHeight,
                // onRest вызывается после завершения анимации
                onRest: () => {
                    console.log("Анимация завершена, высота установлена в", newHeight);
                    // После анимации можно, при необходимости, сбросить inline-стиль до auto,
                    // но поскольку мы используем react-spring, элементу можно оставить вычисленное значение.
                }
            });
        } else {
            console.log("Высота не изменилась, анимация не запускается");
        }
    }, deps); // зависимость зависит от того, когда должно пересчитываться содержимое

    return { ref, springProps };
};

export default useAnimatedHeight;