const ReputationInput = ({ info, formData, setFormData }) => {
    const handleChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    console.log(formData);

    return (
        <>
            {info.map((item) => (
                <div className="slide__input-wrap" key={item.id}>
                    <label className="slide__label" htmlFor={item.id}>{item.label}</label>
                    <input
                        id={item.id}
                        className="slide__input"
                        placeholder={item.placeholder || ""}
                        type={item.type || "text"}
                        value={formData[item.id] || ""}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                    />
                </div>
            ))}
        </>
    );
};

export default ReputationInput;