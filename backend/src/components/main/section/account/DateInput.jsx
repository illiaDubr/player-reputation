import React, {useRef} from 'react';

const DateInput = () => {
    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const handleInput = (e, maxLength, nextRef) => {
        const { value } = e.target;
        if (!/^\d*$/.test(value)) {
            e.target.value = value.slice(0, -1); // Удаляем нечисловые символы
            return;
        }
        if (value.length >= maxLength) {
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }
    };

    const handleBackspace = (e, prevRef) => {
        const { value } = e.target;

        if (e.key === 'Backspace' && value === '' && prevRef && prevRef.current) {
            prevRef.current.focus();
        }
    };

    const handleClick = () => {
        if (dayRef.current.value === '') {
            dayRef.current.focus();
        } else if (monthRef.current.value === '') {
            monthRef.current.focus();
        } else {
            yearRef.current.focus();
        }
    };

    return (
        <div className="slide__input" style={{display: 'flex', gap: '8px'}} onClick={handleClick}>
            <span className="slide__date">
                Д
                <input
                    ref={dayRef}
                    type="text"
                    maxLength={2}
                    onInput={(e) => handleInput(e, 2, monthRef)}
                    onKeyDown={(e) => handleBackspace(e, null)}
                />
            </span>
            /
            <span className="slide__date">
                М
                <input
                    ref={monthRef}
                    type="text"
                    maxLength={2}
                    onInput={(e) => handleInput(e, 2, yearRef)}
                    onKeyDown={(e) => handleBackspace(e, dayRef)}
                />
            </span>
            /
            <span className="slide__date">
                Г
                <input
                    ref={yearRef}
                    type="text"
                    maxLength={4}
                    onInput={(e) => handleInput(e, 4, null)}
                    onKeyDown={(e) => handleBackspace(e, monthRef)}
                />
            </span>
        </div>
    );
};

export default DateInput;