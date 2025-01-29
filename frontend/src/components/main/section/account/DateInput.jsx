import React from 'react';

const DateInput = (formData, setFormData) => {
    const dayRef = React.useRef(null);
    const monthRef = React.useRef(null);
    const yearRef = React.useRef(null);
    const [formattedDate, setFormattedDate] = React.useState('');

    const handleInput = (e, maxLength, nextRef) => {
        const { value } = e.target;
        if (!/^\d*$/.test(value)) {
            e.target.value = value.slice(0, -1);
            return;
        }
        if (value.length >= maxLength) {
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }

        updateDate();
    };

    const handleBackspace = (e, prevRef) => {
        const { value } = e.target;

        if (e.key === 'Backspace' && value === '' && prevRef && prevRef.current) {
            prevRef.current.focus();
        }

        updateDate();
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

    const updateDate = () => {
        const day = dayRef.current.value.padStart(2, '0'); // Дополняем до 2 цифр
        const month = monthRef.current.value.padStart(2, '0'); // Дополняем до 2 цифр
        const year = yearRef.current.value.padStart(4, '0'); // Дополняем до 4 цифр
        setFormattedDate(`${day}-${month}-${year}`);
    };

    return (
        <div className="slide__input" style={{display: 'flex', gap: '8px'}} onClick={handleClick}>
            <span className="slide__custom-input">
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
            <span className="slide__custom-input">
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
            <span className="slide__custom-input">
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