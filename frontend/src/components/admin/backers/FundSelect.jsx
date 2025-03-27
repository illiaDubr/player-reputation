import React from "react";
import { fundsData } from "../../../utils/BackersData.js";
import IconSvg from "../../platform/components/IconSvg.jsx";

const FundSelect = ({selected, onChange}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={`report__select ${isOpen ? "report__select-open" : ""}`}>
            <div className="report__select-title" onClick={toggleDropdown}>
                {selected || "Выберите фонд"}
                <IconSvg width={15} height={15} id="arrow" />
            </div>

            {isOpen && (
                <div className="report__select-options">
                    {fundsData.map((item) => (
                        <div
                            className="report__select-item"
                            key={item.id}
                            onClick={() => handleOptionClick(item.fundName)}
                        >
                            {item.fundName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FundSelect;