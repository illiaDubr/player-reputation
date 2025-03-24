import React from "react";
import {reportData} from "../../../utils/ReportData.js";

const ReportEdit = ({tag}) => {
    const [selected, setSelected] = React.useState(tag);
    const [isOpen, setIsOpen] = React.useState(false);

    if (!tag) return null;

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const found = reportData.find((item) => item.backer_tag === selected);
    const displayedName = found ? found.name : "Нет метки";

    const handleOptionClick = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <form method="PATCH" className="report__form">
            <div className="select">
                {/* Пример вывода */}
                <div onClick={toggleDropdown}>
                    {displayedName}
                </div>
                {isOpen && (
                    <div className="options">
                        {reportData.map((item) => (
                            <div
                                key={item.backer_tag}
                                onClick={() => handleOptionClick(item.backer_tag)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button className="report__btn" type="submit">
                Обновить метку
            </button>
        </form>
    )
}

export default ReportEdit;