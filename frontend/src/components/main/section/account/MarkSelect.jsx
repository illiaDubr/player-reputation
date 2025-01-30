import React from "react";
import {markData} from "../../../../utils/AccountData.js";
import IconSvg from "../../components/IconSvg.jsx";

const MarkSelect = ({onMarkChange}) => {
    const [mark, setMark] = React.useState("");
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const inputRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const getInputWidth = () => inputRef.current?.offsetWidth || 0;

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (index) => {
        setMark(index);
        setIsDropdownOpen(false);
        onMarkChange(index.value);
    };

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    return (
        <>
            <div className="select__country" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={`select__btn ${isDropdownOpen ? "select__btn-open" : ""}`}
                >
                    <IconSvg width={24} height={20} id="arrow"/>
                </button>

                {isDropdownOpen && (
                    <ul
                        className={`country__list ${isDropdownOpen ? "country__list-open" : ""}`}
                        style={{width: `${getInputWidth()}px`}}
                    >
                        {markData.map((index) => (
                            <li
                                className="country__list-item"
                                key={index.value}
                                onClick={() => handleChange(index)}
                            >
                                <span>{index.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={`slide__input ${isDropdownOpen ? "slide__input-focus" : ""}`} ref={inputRef} style={{padding: "18px 24px 18px 50px"}}>
                {mark.name}
            </div>
        </>
    )
}

export default MarkSelect;