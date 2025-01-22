import React, { useState, useRef, useEffect } from "react";
import "flag-icons/css/flag-icons.min.css";
import IconSvg from "../../components/IconSvg.jsx";


const CountrySelect = ({ onPhoneNumberChange }) => {
    const countryCodes = [
        { name: "Украина", code: "UA", dialCode: "+380" },
        { name: "Россия", code: "RU", dialCode: "+7" },
        { name: "США", code: "US", dialCode: "+1" },
        { name: "Германия", code: "DE", dialCode: "+49" },
        { name: "Япония", code: "JP", dialCode: "+81" },
        { name: "Казахстан", code: "KZ", dialCode: "+7" },
    ];

    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const placeholder = "(__) - ___ - __ - __";
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const getInputWidth = () => inputRef.current?.offsetWidth || 0;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatPhone = () => {
        const digits = phoneNumber.split("");
        let digitIndex = 0;
        return placeholder
            .split("")
            .map((char) => (char === "_" && digitIndex < digits.length ? digits[digitIndex++] : char))
            .join("");
    };

    const handleInputChange = (e) => {
        const input = e.target.value.replace(/\D/g, "").slice(0, 9);
        setPhoneNumber(input);
        onPhoneNumberChange(`${selectedCountry.dialCode}${input}`);
    };

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setPhoneNumber("");
        onPhoneNumberChange(country.dialCode);
        setIsDropdownOpen(false);
        inputRef.current.focus();
    };

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    return (
        <div className="search">
            <label htmlFor="phoneNumber" className="search__label">
                Номер телефона
            </label>

            <div className="select__country" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={`select__btn ${isDropdownOpen ? "select__btn-open" : ""}`}
                >
                    <IconSvg width={24} height={20} id="arrow" />
                    <span className={`fi fi-${selectedCountry.code.toLowerCase()}`} />
                </button>

                {isDropdownOpen && (
                    <ul
                        className={`country__list ${isDropdownOpen ? "country__list-open" : ""}`}
                        style={{ width: `${getInputWidth()}px` }}
                    >
                        {countryCodes.map((country) => (
                            <li
                                className="country__list-item"
                                key={country.code}
                                onClick={() => handleCountryChange(country)}
                            >
                                <span className={`fi fi-${country.code.toLowerCase()}`} />
                                <span>{country.dialCode}</span>
                                <span>{country.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div onClick={() => inputRef.current.focus()}>
                <div
                    className={`search__input country__input ${
                        isInputFocused ? "country__input-focused" : ""
                    } ${isDropdownOpen ? "country__input-open" : ""}`}
                >
                    {`${selectedCountry.dialCode} ${formatPhone()}`}
                </div>
                <input
                    className="search__input-hidden"
                    ref={inputRef}
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    onChange={handleInputChange}
                    aria-label="Phone number input"
                />
            </div>
        </div>
    );
};

export default CountrySelect;