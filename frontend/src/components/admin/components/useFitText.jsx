import { useRef, useEffect } from "react";

/**
 * Хук, который автоматически подгоняет размер шрифта,
 * чтобы текст умещался в контейнер по ширине.
 *
 * @param {number} maxFontSize - максимальный размер шрифта (px).
 * @param {number} minFontSize - минимальный размер шрифта (px).
 * @returns {React.RefObject} - ref, который нужно повесить на элемент с текстом.
 */
export function useFitText(maxFontSize = 17, minFontSize = 7) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Ставим изначально максимальный размер шрифта
        let currentSize = maxFontSize;
        element.style.fontSize = currentSize + "px";

        // Пока текст "выходит" за ширину элемента, уменьшаем шрифт
        while (
            element.scrollWidth > element.offsetWidth &&
            currentSize > minFontSize
            ) {
            currentSize -= 1;
            element.style.fontSize = currentSize + "px";
        }
    }, [maxFontSize, minFontSize]);

    return ref;
}