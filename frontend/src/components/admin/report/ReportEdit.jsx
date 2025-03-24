import React from "react";
import {reportData} from "../../../utils/ReportData.js";
import IconSvg from "../../platform/components/IconSvg.jsx";

const ReportEdit = ({tag}) => {
    const [selected, setSelected] = React.useState(tag);
    const [isOpen, setIsOpen] = React.useState(false);

    if (!tag) return null;

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const found = reportData.find((item) => item.backer_tag === selected);
    const displayedName = found ? found.name : "Нет метки";
    const displayedColor = found ? found.color : "gray";

    const handleOptionClick = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <form method="PATCH" className="report__form">
            <div className={`report__select ${isOpen ? "report__select-open" : ""}`}>
                <div className={`report__select-title report__select-text-${displayedColor}`} onClick={toggleDropdown}>
                    {displayedName}
                    <IconSvg width={20} height={6} id="arrow"/>
                </div>
                {isOpen && (
                    <div className="report__select-options">
                        {reportData.map((item) => (
                            <div
                                className={`report__select-item report__select-text-${item.color}`}
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