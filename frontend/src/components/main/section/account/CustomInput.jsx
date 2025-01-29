import React from "react";

const CustomInput = ({info, formData, setFormData}) => {

    const handleInput = (e) => {
        const {value} = e.target;
        if (!/^\d*$/.test(value)) {
            e.target.value = value.slice(0, -1);
        }
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <>
            {info.map((item) => (
                <div className="slide__input-wrap" key={item.id}>
                    <label className="slide__label" htmlFor={item.id}>
                        {item.label}
                    </label>
                    <div className="slide__input" style={{display: 'flex', gap: '8px'}}>
                        <div className="slide__custom-input slide__amount">
                            $
                            <input
                                id={item.id}
                                placeholder={item.placeholder || ""}
                                type={item.type || "text"}
                                value={formData[item.id] || ""}
                                onInput={handleInput}
                                onChange={(e) => handleChange(item.id, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CustomInput;